'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('follows', { 
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      quem_segue: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      seguido: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: "cascade",
        onUpdate: "cascade"
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updateAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
     });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('follows');
  }
};
