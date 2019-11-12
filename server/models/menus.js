'use strict';
module.exports = (sequelize, DataTypes) => {
    const Menus = sequelize.define('Menus', {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        discount: DataTypes.INTEGER,
    }, {});
    Menus.associate = function(models) {
        Menus.belongsToMany(models.Product,{
            through: {
                model: models.MenuProducts,
            },
            foreignKey: 'menuId'
        })
    };
    return Menus ;
};