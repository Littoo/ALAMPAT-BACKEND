const User = require('../models/user')
const {ObjectId} = require("mongodb")
const bcrypt = require('bcryptjs')
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './profileUploads');
  },
  filename: function(req, file, cb) {
    const now = new Date().toISOString();
    const date = now.replace(/:/g, "-");
    cb(null, date + file.originalname);
    
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 20
  },
  fileFilter: fileFilter
});


const getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({ email });
        return user
    }
    catch (error) {
        console.log(error)
        return { error }
    }
}

const getUserList = (req, res, next) => {
    User.find()
        .then((users)=>{
            console.log(users);
            res.status(200).json({
                userArray: users
            })
        })
}

const getUserByID = (req, res, next) =>{
    User.findById(req.params.id)
        .then((user)=>{
            if (!user) {
                console.log()
                return res.status(404).json({
                    message: "Data Retrieving Failed",
                    success: false,
                    
                });
            }
            return res.status(200).json({
                message: "Data Retrieved successfully",
                success: true,
                userData: user});
        })
        .catch(error => 
            res.status(400).json({
                message: "Data Retrieviing Failed!!",
                error: error,
                success: false
            })
            );
}

const updateAccount = async(req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.json({
                    error: err
                })
            }

            else{
                //getting the image file, convert to base64 format and save it into the final image object
                const imgfile = req.file;

                let img = fs.readFileSync(imgfile.path)

                const enc_file = img.toString('base64') 

                let final_img = {
                    filename: imgfile.originalname,
                    contentType: imgfile.mimetype,
                    imageBase64: enc_file
                }

                //creates a new user object together with the final image object
                const user = new User({
                name: req.body.name,
                profileImage: final_img,
                email: req.body.email,  
                phoneNumber: req.body.phoneNumber,
                address: req.body.address,
                password: hashedPass, 
             })

            //updates the user object data to the database 
            User.findByIdAndUpdate( new ObjectId(req.params.id), user)
                .then((result) => {
                    //console.log(result)
                    res.json({
                        message: 'User account data updated successfully!',
                        result
                    })
                    
                }).catch((error)=>{
                    res.status(400).json({
                        message: 'User account data update failed!',
                        error:error
                    })
                   
                })
            }
        })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({ error })
    }
}

module.exports = { 
    getUserByEmail, getUserList, getUserByID, updateAccount, upload 
}