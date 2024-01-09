'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('coments', 'post_id', { 
      type: Sequelize.INTEGER,
      references: {
        model: 'posts',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
     });
  },

  async down (queryInterface, Sequelize) {
  }
};
