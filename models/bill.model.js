module.exports = (Sequelize, sequelize) => {
    const Bill = sequelize.define("bill", {
        seriesNumber: Sequelize.STRING,
        billNumber: Sequelize.STRING,
        date: Sequelize.DATE
    });
    return Bill;
};