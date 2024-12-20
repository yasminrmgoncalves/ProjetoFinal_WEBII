'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('tb_pedido_item', 'PedidoItem');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('PedidoItem', 'tb_pedido_item');
  }
};
