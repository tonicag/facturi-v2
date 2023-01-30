module.exports = (Sequelize, sequelize) => {
    const Address = sequelize.define("address", {
        street: Sequelize.STRING,
        floor: Sequelize.STRING,
        apartment: Sequelize.STRING,
        block: Sequelize.STRING,
        county: Sequelize.STRING,
        city: Sequelize.STRING
    })

    return Address;
}