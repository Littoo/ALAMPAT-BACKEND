const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/getUserByEmail', (req, res, next) => {

    const user = userController.getUserByEmail(email)
    res.send({ user })
})

router.put('/updateAccount/:id?', userController.upload.single('profileImage'), userController.updateAccount)
module.exports = router;

