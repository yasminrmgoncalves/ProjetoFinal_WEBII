const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class PedidoItem extends Model {
    static associate(models) {
      // PedidoItem pertence a um Pedido
      PedidoItem.belongsTo(models.Pedido, {
        foreignKey: 'id_pedido', // Chave estrangeira no PedidoItem
        as: 'pedido', // Alias para a associação
      });

      // PedidoItem pertence a um Produto
      PedidoItem.belongsTo(models.Produto, {
        foreignKey: 'id_produto', // Chave estrangeira no PedidoItem
        as: 'produto', // Alias para a associação
      });
    }
  }

  PedidoItem.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      id_pedido: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Pedido', // Nome da tabela Pedido
          key: 'id', // Chave primária de Pedido
        },
      },
      id_produto: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: 'Produto', // Nome da tabela Produto
          key: 'id', // Chave primária de Produto
        },
      },
      quantidade: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      sequelize,
    }
  );

  return PedidoItem;
};
