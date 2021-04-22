const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: 'Name can\'t be empty'
    },
    profileImage: {
        type: String,
         //required: 'Date of Birth can\'t be empty'

    },
    DOB: {
        type: Date,
         //required: 'Date of Birth can\'t be empty'

    },
    email: {
        type: String,
        required: 'email can\'t be empty',
        unique: true
    },
    phoneNumber: {
        type: String
    },
    address: {
        type: String
    },
    password: {
        type: String,
        required: 'password can\'t be empty',
        minlength: [8, 'password must be atleast 8 characters long']
    },
    userType: {
        type: String,
        required: 'user type cannot be empty'
    }
}, { timestamps: true });

userSchema.path('email').validate((val) => {
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');




const User = mongoose.model("users", userSchema);
module.exports = User