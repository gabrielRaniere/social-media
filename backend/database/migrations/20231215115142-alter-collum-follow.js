'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('follows', 'updateAt');

    await queryInterface.addColumn('follows', 'updatedAt', { 
      type: Sequelize.DATE,
      allowNull: false
     });
  },

  async down (queryInterface, Sequelize) {
  }
};
