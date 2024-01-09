'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('posts', 'hastags', {
      allowNull: false,
      type: Sequelize.STRING
    });
  },

  async down (queryInterface) {
     await queryInterface.dropTable('posts');
  }
};
