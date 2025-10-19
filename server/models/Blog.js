const { Model, DataTypes } = require("sequelize");
const { sequelize } = require("./../configs");
const { getInvalidYearErrorMessage, errorNames } = require("../middlewares/errorHandler");

class Blog extends Model {}

Blog.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  author: {
    type: DataTypes.TEXT
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1991,
      isNotFutureYear(value) {
        const currentYear = new Date().getFullYear();
        if (value > currentYear) {
          const invalidYearError = new Error(getInvalidYearErrorMessage(currentYear));
          invalidYearError.name = errorNames.invalidYear
          throw invalidYearError;
        }
      }
    }
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  createdAt: true,
  updatedAt: true,
  modelName: 'blog'
});

module.exports = Blog