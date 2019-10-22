'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    code: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Images)
    Product.hasMany(models.Formats)
    Product.belongsToMany(models.ActivePrinciples,{
      through: {
        model: models.ProductActivePrinciple,
      },
      foreignKey: 'productId'
    })
  };
  return Product;
};