'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductActivePrinciple = sequelize.define('ProductActivePrinciple', {
  }, {});
  ProductActivePrinciple.associate = function(models) {
    // associations can be defined here
  };
  return ProductActivePrinciple;
};