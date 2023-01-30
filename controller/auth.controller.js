const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const signUp = async(req, res) => {
    try {
        const user = db.User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password1, 8)
        })

        return res.status(200).json({ 'succes': 'Successfully registered user!' });
    } catch (err) {
        return res.status(404).json({ 'error': 'Bad request!' });
    }

}
const signIn = async(req, res) => {
    try {
        let email = req.body.email;
        let password = req.body.password;
        if (!email || !password) {
            return res.status(400).json({ 'message': 'Email or password not provided' });
        }
        var user = await db.User.findOne({
            where: {
                email: email
            }
        });
        if (!user) return res.status(400).json({ 'message': 'Invalid email/password!' });
        bcrypt.compare(password, user.password, (err, success) => {
            if (err) {
                return res.status(404).json({ 'error': 'Bad request!' });
            }
            if (success) {
                const token = jwt.sign({
                    userId: user.id,
                    email: user.email
                }, jwtConfig.key, { expiresIn: "10h" });
                return res.status(200).json({
                    email: email,
                    userId: user.id,
                    token: token
                });
            } else {
                res.status(400).json({ 'message': 'Invalid email/password!' });
            }
        });

    } catch (err) {
        return res.status(400).json({ 'error': 'Bad request!' });
    }
};
module.exports = {
    signUp: signUp,
    signIn: signIn
}