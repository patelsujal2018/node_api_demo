'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.product.hasOne(models.product_category,{
        foreignKey:'id',
        sourceKey:'category_id'
      })
    }
  };
  product.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category_id: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    status: DataTypes.TINYINT(1),
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};