'use strict';
module.exports = (sequelize, DataTypes) => {
  const Formats = sequelize.define('Formats', {
    info: DataTypes.STRING
  }, {});
  Formats.associate = function(models) {
  	Formats.belongsTo(models.Product,{foreignKey: 'productId'})
    // associations can be defined here
  };
  return Formats;
};