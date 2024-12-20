const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Pedido extends Model {
    static associate(models) {
      // Um pedido tem um atendente
      Pedido.hasOne(models.Atendente, {
        foreignKey: 'id', // Chave que conecta o atendente ao pedido
        sourceKey: 'id_atendente', // Chave no modelo Pedido que referencia Atendente
        as: 'atendente', // Alias para a associação
      });

      // Um pedido pode ter muitos itens
      Pedido.hasMany(models.PedidoItem, {
        foreignKey: 'id_pedido', // Nome da chave estrangeira em PedidoItem
        as: 'itens', // Alias para a associação
      });

      Pedido.belongsToMany(models.Produto, {
        through: models.PedidoItem, // Modelo intermediário
        foreignKey: 'id_pedido', // Chave estrangeira em PedidoItem
        otherKey: 'id_produto', // Outra chave em PedidoItem
        as: 'produtos', // Alias para a associação
      });
    }
  }

  Pedido.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      data_criacao: {
        allowNull: false,
        autoIncrement: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      cliente: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pendente",
      },
      id_atendente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Atendente', // Nome da tabela do atendente
          key: 'id', // Chave primária da tabela Atendente
        },
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      sequelize,
    }
  );

  return Pedido;
};
