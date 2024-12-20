'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const ProdutoTable = queryInterface.createTable('tb_produto', {
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
      preco:{
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
      qtd_gramas:{
        type: Sequelize.DOUBLE,
        allowNull: false,
      }, 
      descricao:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      status:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      foto:{
        type: Sequelize.STRING,
        allowNull: false,
      }
  });
    return ProdutoTable;
  },

  down: async (queryInterface) => queryInterface.dropTable('tb_produto'),
};
