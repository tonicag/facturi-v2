const permissions = require('../middleware/permissions');
const companyController = require('../controller/company.controller');
module.exports = (app) => {
    app.post('/company', [permissions.isAuthenticated], companyController.createCompany);
    app.post('/buyerCompany', [permissions.isAuthenticated], companyController.createBuyerCompany);

    app.get('/company', [permissions.isAuthenticated], companyController.getCompany);
    app.put('/company/:companyId', [permissions.isAuthenticated], companyController.updateCompany);

    app.post('/address', [permissions.isAuthenticated], companyController.createAddress);
    app.get('/address/:addressId', [permissions.isAuthenticated, permissions.isAddressOwner], companyController.getAddressById);
    app.get('/address/', [permissions.isAuthenticated], companyController.getAllAdresses);
    app.put('/address/:addressId', [permissions.isAuthenticated, permissions.isAddressOwner], companyController.updateAddress);

}