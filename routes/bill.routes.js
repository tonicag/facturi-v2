const permissions = require('../middleware/permissions');
const billController = require('../controller/bill.controller');
module.exports = (app) => {
    app.get('/bill', [permissions.isAuthenticated], billController.getAllBills);
    app.post('/bill', [permissions.isAuthenticated], billController.createBill);
    app.put('/bill/:billId', [permissions.isAuthenticated, permissions.isBillOwner], billController.updateBill);
}