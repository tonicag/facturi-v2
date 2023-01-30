const db = require('../models');
const bcrypt = require('bcryptjs');

const checkEmailUsernameDuplicate = async(req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password1 = req.body.password1;
    const password2 = req.body.password2;
    if (!username || !email || !password1 || !password2) {
        return res.status(400).json({ 'message': 'Please enter all fields!' });
    }
    if (!password1.match(password2)) {
        return res.status(400).json({ 'message': 'Passwords do not match' });
    }

    var user = await db.User.findOne({
        where: {
            username: username
        }
    });
    if (user) {
        return res.status(400).json({ 'message': 'Username already exists' });
    }
    var user = await db.User.findOne({
        where: {
            email: email
        }
    });
    if (user) {
        return res.status(400).json({ 'message': 'Email already exists' });
    }
    next();
}
module.exports = {
    checkEmailUsernameDuplicate
}