const User = require('../models/user')
const {ObjectId} = require("mongodb");
const bcrypt = require('bcryptjs')

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

const updateAccount = async(req, res, next) => {
    try {
        bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
            if (err) {
                res.json({
                    error: err
                })
            }
        
            const user = new User({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            password: hashedPass, 
        })
        User.findByIdAndUpdate( new ObjectId(req.params.id), user)
            .then(() => {
                res.json({
                    message: 'User account data updated successfully!'
                })
            }).catch((error)=>{
                res.status(400).json({
                    error:error
                })
            })
        return user
        })
    }
    catch (error) {
        console.log(error)
        return { error }
    }
}

module.exports = { 
    getUserByEmail,updateAccount 
}