'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ActivePrinciples', {
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
      information: {
        allowNull: true,
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
      queryInterface.sequelize.query("insert into ActivePrinciples (id, name, information, createdAt, updatedAt) values (1,'Vegetariana', 'Platos sin carne','2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("insert into ActivePrinciples (id, name, information, createdAt, updatedAt) values (2,'Vegana', 'Platos sin derivados de aniamales ','2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("insert into ActivePrinciples (id, name, information, createdAt, updatedAt) values (3,'Sintacc', 'Platos aptos para celiacos', '2019-11-10 05:01:08','2019-11-10 05:01:08')");
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ActivePrinciples');
  }
};