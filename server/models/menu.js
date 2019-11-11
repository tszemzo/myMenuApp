'use strict';
module.exports = (sequelize, DataTypes) => {
    const Menu = sequelize.define('Menu', {
        name: DataTypes.STRING,
        information: DataTypes.STRING,
        discount: DataTypes.INTEGER,
    }, {});
    Menu.associate = function(models) {
        Menu.belongsToMany(models.Product,{
            through: {
                model: models.MenuProducts,
            },
            foreignKey: 'menuId'
        })
    };
    return Menu ;
};