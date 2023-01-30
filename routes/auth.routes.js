const authController = require('../controller/auth.controller');
const verifySignUp = require('../middleware/verifySignUp');
module.exports = (app) => {

    app.post('/auth/register', [verifySignUp.checkEmailUsernameDuplicate],
        authController.signUp
    );
    app.post('/auth/login', [], authController.signIn);

}