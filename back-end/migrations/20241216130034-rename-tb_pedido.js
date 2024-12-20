'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameTable('tb_pedido', 'Pedido');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameTable('Pedido', 'tb_pedido');
  }
};
