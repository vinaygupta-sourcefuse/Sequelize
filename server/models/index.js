const { Sequelize } = require("sequelize");
const config = require("../config/config.json")["development"];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const Author = require("./Author")(sequelize);
const Category = require("./Category")(sequelize);
const Book = require("./Book")(sequelize);

// Define relationships
Book.belongsTo(Author, { foreignKey: "author_id", onDelete: "CASCADE" });
Book.belongsTo(Category, { foreignKey: "category_id", onDelete: "SET NULL" });

module.exports = { sequelize, Author, Category, Book };
