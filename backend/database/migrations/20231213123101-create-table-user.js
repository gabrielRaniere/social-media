/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.createTable('users', {
       id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
       },
       nome: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
       },
       password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
       },
       createdAt: {
        type: Sequelize.DATE,
        allowNull: false
       },
       updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
       }
      });
  },

  async down (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('users');
  }
};
