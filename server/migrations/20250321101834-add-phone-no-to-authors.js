"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Author", "phone_no", {
      type: Sequelize.STRING(15),
      allowNull: true, // Optional, set to false if required
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn("Author", "phone_no");
  },
};
