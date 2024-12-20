const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Atendente extends Model {
    static associate(models) {
      
    }
  }
  Atendente.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      nome: {
        allowNull: false,
        autoIncrement: false,
        type: DataTypes.STRING,
      },
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      freezeTableName: true,
      timestamps: false,
      sequelize,
    }
  );
  return Atendente;
};
