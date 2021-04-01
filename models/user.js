const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber:{
        type: String
    },
    address:{
        type: String
    },
    password:{
        type: String
    },
    userType:{
        type: String
    }
}, {timestamps: true});

const User = mongoose.model("users", userSchema);
module.exports = User