const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Author = sequelize.define("Author", {
    author_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    author: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
}, {
    tableName: "Author",
    timestamps: false,
});

module.exports = Author;
