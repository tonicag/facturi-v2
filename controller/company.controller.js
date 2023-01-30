const db = require('../models');

const addNewCompany = async(req, res) => {

    if (!req.body.company || !req.body.company.name || !req.body.company.registrationNumber || !req.body.company.cuiNumber) {
        return res.status(400).json({ 'message': 'Please provide the name, registration number and CUI number of the company' });
    }
    const name = req.body.company.name;
    const registrationNumber = req.body.company.registrationNumber;
    const cuiNumber = req.body.company.cuiNumber;
    try {
        const user = await db.User.findOne({
            where: {
                id: req.body.userId
            }
        });
        if (user.companyId) return res.status(400).json({ 'message': 'Already has a company attached!' });
        const company = await db.Company.create({
            name: name,
            registrationNumber: registrationNumber,
            cuiNumber: cuiNumber
        });
        //console.log(user instanceof db.User);
        await company.setUser(user);
        await user.setCompany(company);
        return res.status(400).json({ 'message': 'Successfully added!' });

    } catch (err) {
        console.log(err);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
}
const addNewBuyerCompany = async(req, res) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: req.body.userId
            }
        });
        const company = await db.Company.build(req.body.company);
        company.userId = user.id;
        await company.save();
        return res.status(200).json({ 'message': 'Successfully added company!' });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
}
const getCompany = async(req, res) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: req.body.userId
            }
        });
        const company = await db.Company.findByPk(user.companyId);
        if (!company) {
            return res.status(400).json({ 'message': 'Please set your company!' });
        }
        //console.log(company);
        return res.status(200).json(company.toJSON());
    } catch (err) {
        console.log(err);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }

}

const updateCompany = async(req, res) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: req.body.userId
            }
        });

        const company = await db.Company.findByPk(req.params.companyId);

        if (company.userId != user.id) {
            return res.status(400).json({ 'message': 'You dont have access to edit this company!' });
        }

        const result = await company.update(req.body.company);

        return res.status(200).json({ 'success': 'Company has been succesfully updated!' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
};
const createAddress = async(req, res) => {
    if (!req.body.address) return res.status(400).json({ 'message': 'Nothing was given!' });
    try {
        const user = await db.User.findOne({
            where: {
                id: req.body.userId
            }
        });
        let address = await db.Address.build(req.body.address);
        address.companyId = user.companyId;
        await address.save();
        return res.status(200).json({ 'success': 'Address has been succesfully created!' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
};
const getAddressById = async(req, res) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: req.body.userId
            }
        });
        const address = await db.Address.findByPk(req.params.addressId);

        return res.status(200).json(address.toJSON());
    } catch (err) {
        console.log(err);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
};
const getAllAdresses = async(req, res) => {
    try {
        const user = await db.User.findOne({
            where: {
                id: req.body.userId
            }
        });
        console.log(user.email);
        const address = await db.Address.findAll({ raw: true }, {
            where: {
                companyId: user.companyId
            }
        });
        //console.log(address);

        return res.status(200).json({ "address": address });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
}
const updateAddress = async(req, res) => {
    if (!req.body.address) return res.status(400).json({ 'message': 'Nothing was given to update!' });
    try {
        const user = await db.User.findOne({
            where: {
                id: req.body.userId
            }
        });
        const address = await db.Address.findByPk(req.params.addressId);
        if (address) {
            const res = await address.update(req.body.address);
        }
        return res.status(200).json({ 'message': 'Successfuly updated address!' });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ 'message': 'Something went wrong!' });
    }
};
module.exports = {
    createCompany: addNewCompany,
    createBuyerCompany: addNewBuyerCompany,
    getCompany: getCompany,
    updateCompany: updateCompany,
    createAddress: createAddress,
    getAddressById: getAddressById,
    updateAddress: updateAddress,
    getAllAdresses: getAllAdresses
};