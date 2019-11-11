'use strict';
module.exports = (sequelize, DataTypes) => {
    const MenuProducts = sequelize.define('MenuProducts', {
    }, {});
    MenuProducts.associate = function(models) {
        //
    };
    return MenuProducts;
};