'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const AtendenteTable = queryInterface.createTable('tb_atendente', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      login:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      senha:{
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      status:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      }
  });
    return AtendenteTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('tb_atendente'),
};
