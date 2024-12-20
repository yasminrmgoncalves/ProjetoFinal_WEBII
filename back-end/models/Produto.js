const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Produto extends Model {
    static associate(models) {
      Produto.belongsToMany(models.Pedido, {
        through: models.PedidoItem, // Modelo intermediário
        foreignKey: 'id_produto', // Chave estrangeira em PedidoItem
        otherKey: 'id_pedido', // Outra chave em PedidoItem
        as: 'pedidos', // Alias para a associação
      });
    }
  }
  Produto.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome:{
        allowNull: false,
        autoIncrement: false,
        type: DataTypes.STRING,
      },
      preco:{
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      qtd_gramas:{
        type: DataTypes.DOUBLE,
        allowNull: false,
      }, 
      descricao:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      status:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      foto:{
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      sequelize,
    }
  );
  return Produto;
};
