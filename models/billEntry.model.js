module.exports = (Sequelize, sequelize) => {
    const BillEntry = sequelize.define('billEntry', {
        productName: Sequelize.STRING,
        price: Sequelize.DECIMAL,
        quantity: Sequelize.DECIMAL
    });
    return BillEntry;
}