'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const PedidoTable = queryInterface.createTable('tb_pedido', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data_criacao:{
        allowNull: false,
        autoIncrement: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.NOW,
      },
      cliente:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      status:{
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Pendente",
      }
  });
    return PedidoTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('tb_pedido'),
};