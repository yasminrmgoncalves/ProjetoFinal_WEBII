'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const PedidoItemTable = queryInterface.createTable('tb_pedido_item', {
      id:{
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      id_pedido:{
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_pedido',   
          key: 'id',             
        },   
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL',
      },
      id_produto:{
        type: Sequelize.INTEGER,
        references: {
          model: 'tb_produto',   
          key: 'id',             
        },   
        onUpdate: 'CASCADE', 
        onDelete: 'SET NULL',
      },
      quantidade:{
        type: Sequelize.INTEGER,
        allowNull: false,
      }
  });
    return PedidoItemTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('tb_pedido_item'),
};
