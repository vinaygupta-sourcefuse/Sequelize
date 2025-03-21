const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Author = require("./Author");
const Category = require("./Category");

const Book = sequelize.define("Book", {
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    isbn: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    pubDate: {
        type: DataTypes.DATE,
    },
}, {
    tableName: "Book",
    timestamps: false,
});

// Define relationships/associations
Book.belongsTo(Author, { foreignKey: "author_id", onDelete: "CASCADE" });
Book.belongsTo(Category, { foreignKey: "category_id", onDelete: "SET NULL" });

module.exports = Book;
