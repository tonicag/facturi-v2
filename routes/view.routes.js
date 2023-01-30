const permissions = require('../middleware/permissions');
const companyController = require('../controller/company.controller');
module.exports = (app) => {
    app.get('/test', [permissions.isAuthenticated], (req, res) => {

        return res.status(200).json({ 'message': 'YouHaveAccess!' });
    });
}