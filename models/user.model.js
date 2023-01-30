module.exports = (Sequelize, sequelize) => {
    const User = sequelize.define("user", {
        username: Sequelize.TEXT,
        email: Sequelize.TEXT,
        password: Sequelize.TEXT
    })

    return User;
}