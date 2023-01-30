const permissions = require('../middleware/permissions');
const billEntryController = require('../controller/billEntry.controller');
module.exports = (app) => {
    app.post('/billentry', [permissions.isAuthenticated], billEntryController.createBillEntry);
    app.get('/billentry/:billentryId', [permissions.isAuthenticated], billEntryController.getBillEntry);
    app.get('/billentry/', [permissions.isAuthenticated], billEntryController.getAllBillEntry);
    app.put('/billentry/:billentryId', [permissions.isAuthenticated], billEntryController.updateOneBillEntry);
}