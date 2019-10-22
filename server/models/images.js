'use strict';
module.exports = (sequelize, DataTypes) => {
  const Images = sequelize.define('Images', {
    link: DataTypes.STRING
  }, {});
  Images.associate = function(models) {
    // associations can be defined here
    Images.belongsTo(models.Product, {foreignKey: "productId"})
  };

  return Images;
};