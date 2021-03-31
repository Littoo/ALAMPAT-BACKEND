const User      = require('../models/user')
const bcrypt    = require('bcryptjs')
const jwt       = require('jsonwebtoken')

const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass){
        if(err){
            res.json({
                error:err
            })
        }

        let user = new User ({
            name: req.body.name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            address: req.body.address,
            password: hashedPass
        })
    
        user.save()
        .then(user => {
            res.json({
                message: 'User Registered successfully!'
            })
        })
    
        .catch(error =>{
            res.json({
                message: 'An error occurred uwu!'
            })
        })
    })

   
}

module.exports = {
    register
}