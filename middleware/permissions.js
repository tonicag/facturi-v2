const db = require('../models');
const jwt = require('jsonwebtoken');
const jwtConfig = require('../config/jwt.config');

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(400).json({ 'message': 'Please provide the authorization token!' });
    }
    try {
        const decodedToken = jwt.verify(token, jwtConfig.key);
        if (decodedToken) {
            //console.log(req.body);
            if (decodedToken.userId != req.body.userId) {
                return res.status(400).json({ 'message': 'Please provide the authorization token and the userId in the body!' });
            }
            console.log('Authorized: ', decodedToken.email);
        }
        // console.log(decodedToken);
    } catch (error) {
        //console.log(error);
        return res.status(400).json({ 'message': 'InvalidToken' });
    }

    next();
};
const isAddressOwner = async(req, res, next) => {

    try {
        const user = await db.User.findByPk(req.body.userId);
        const address = await db.Address.findByPk(req.params.addressId);
        if (address.companyId != user.companyId)
            return res.status(400).json({ 'message': 'Something went wrong! - Authentication permissions!' });
    } catch (error) {
        return res.status(400).json({ 'message': 'Something went wrong! - Authentication permissions!' });
    }
    next();
};
const isBillOwner = async(req, res, next) => {
    try {
        const user = await db.User.findByPk(req.body.userId);
        const bill = await db.Bill.findByPk(req.params.billId);

        if (bill.ownerId != user.companyId)
            return res.status(400).json({ 'message': 'Something went wrong! - Authentication permissions!' });
    } catch (error) {
        return res.status(400).json({ 'message': 'Something went wrong! - Authentication permissions!' });
    }
    next();
}
module.exports = {
    isAuthenticated: isAuthenticated,
    isAddressOwner: isAddressOwner,
    isBillOwner: isBillOwner
}