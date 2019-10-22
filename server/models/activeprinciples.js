'use strict';
module.exports = (sequelize, DataTypes) => {
  const ActivePrinciples = sequelize.define('ActivePrinciples', {
    name: DataTypes.STRING,
    information: DataTypes.STRING,
  }, {});
  ActivePrinciples.associate = function(models) {
    ActivePrinciples.belongsToMany(models.Product,{
    	through: {
    		model: models.ProductActivePrinciple,
    	},
    	foreignKey: 'activePrincipleId'
    })
  };
  return ActivePrinciples;
};