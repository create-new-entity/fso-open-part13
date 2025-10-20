const { DataTypes, Model } = require("sequelize")
const { sequelize } = require("../configs")

class Token extends Model {}

Token.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  token: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'token'
})

module.exports = Token