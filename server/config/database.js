const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("bms", "vinay", "password", {
    host: "localhost",
    dialect: "mysql",
    logging: false, // Disable console logging of SQL queries
});

module.exports = sequelize;
