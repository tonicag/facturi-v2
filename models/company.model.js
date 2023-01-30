module.exports = (Sequelize, sequelize) => {
    const Company = sequelize.define("company", {
        name: Sequelize.STRING,
        registrationNumber: Sequelize.STRING,
        cuiNumber: Sequelize.STRING
    });

    return Company;
}