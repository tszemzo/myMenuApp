'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
  }, {});
  Product.associate = function(models) {
    // associations can be defined here
    Product.hasMany(models.Images)
    Product.belongsTo(models.FoodTypes,{foreignKey: "foodTypeId"})
    Product.belongsToMany(models.ActivePrinciples,{
      through: {
        model: models.ProductActivePrinciple,
      },
      foreignKey: 'productId'
    })
    Product.belongsToMany(models.Menus,{
      through: {
        model: models.MenuProducts,
      },
      foreignKey: 'productId'
    })
  };
  return Product;
};