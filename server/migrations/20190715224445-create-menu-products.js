'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('MenuProducts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            productId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            MenuId: {
                allowNull: false,
                type: Sequelize.STRING
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
            queryInterface.sequelize.query("INSERT INTO MenuProducts (id,productId,MenuId,createdAt,updatedAt) VALUES (20,1, 35,'2019-11-18 21:46:58','2019-11-18 21:46:58');");
            queryInterface.sequelize.query("INSERT INTO MenuProducts (id,productId,MenuId,createdAt,updatedAt) VALUES (21,2, 35, '2019-11-18 21:46:58','2019-11-18 21:46:58');");
            queryInterface.sequelize.query("INSERT INTO MenuProducts (id,productId,MenuId,createdAt,updatedAt) VALUES (22,3, 35, '2019-11-18 21:46:58','2019-11-18 21:46:58');");

        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('MenuProducts');
    }
};