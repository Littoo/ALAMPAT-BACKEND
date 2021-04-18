const User = require('../models/user')

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

module.exports = { getUserByEmail }