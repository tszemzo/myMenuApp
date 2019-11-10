'use strict';
module.exports = (sequelize, DataTypes) => {
    const FoodTypes = sequelize.define('FoodTypes', {
        name: DataTypes.STRING,
    }, {});
    FoodTypes.associate = function(models) {
        FoodTypes.hasMany(models.Product)
    };

    return FoodTypes;
};