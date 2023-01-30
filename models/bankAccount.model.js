module.exports = (Sequelize, sequelize) => {
    const BankAccount = sequelize.define("bankAccount", {
        bankName: Sequelize.STRING,
        accountNumber: Sequelize.STRING
    });

    return BankAccount;
}