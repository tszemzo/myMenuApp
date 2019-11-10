'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('FoodTypes', {
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
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }).then(function () {
            queryInterface.sequelize.query("insert into FoodTypes (id, name, createdAt, updatedAt) values (1,'Entrada','2019-11-10 05:01:08','2019-11-10 05:01:08')");
            queryInterface.sequelize.query("insert into FoodTypes (id, name,  createdAt, updatedAt) values (2,'Plato principal','2019-11-10 05:01:08','2019-11-10 05:01:08')");
            queryInterface.sequelize.query("insert into FoodTypes (id, name,  createdAt, updatedAt) values (3,'Postre', '2019-11-10 05:01:08','2019-11-10 05:01:08')");
            queryInterface.sequelize.query("insert into FoodTypes (id, name,  createdAt, updatedAt) values (4,'Guarnicion','2019-11-10 05:01:08','2019-11-10 05:01:08')");
            queryInterface.sequelize.query("insert into FoodTypes (id, name,  createdAt, updatedAt) values (5,'Bebida', '2019-11-10 05:01:08','2019-11-10 05:01:08') ");
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('Types');
    }
};