'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Menus', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            description: {
                allowNull: false,
                type: Sequelize.STRING
            },
            discount: {
                allowNull: false,
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(function () {
            queryInterface.sequelize.query("INSERT INTO Menus (id,name,description,discount, createdAt,updatedAt) VALUES (35,'Menu ejecutivo','Ahorra en tu almuerzo labora',35,'2019-11-18 21:46:58','2019-11-18 21:46:58');");
         });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Menus');
    }
};