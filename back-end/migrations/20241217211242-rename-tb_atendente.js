'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
      await queryInterface.renameTable('tb_atendente', 'Atendente');
    },
  
    async down (queryInterface, Sequelize) {
      await queryInterface.renameTable('Atendente', 'tb_atendente');
    }
};
