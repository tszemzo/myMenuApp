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
      queryInterface.sequelize.query("insert into ActivePrinciples (id, name, information, createdAt, updatedAt) values (1,'Entrada', 'Entrada','2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("insert into ActivePrinciples (id, name, information, createdAt, updatedAt) values (2,'Plato principal', 'Plato principal','2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("insert into ActivePrinciples (id, name, information, createdAt, updatedAt) values (3,'Postre', 'Postre', '2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("insert into ActivePrinciples (id, name, information, createdAt, updatedAt) values (4,'Guarnicion', 'Guarnicion','2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("insert into ActivePrinciples (id, name, information, createdAt, updatedAt) values (5,'Bebida', 'Bebida', '2019-11-10 05:01:08','2019-11-10 05:01:08') ");
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ActivePrinciples');
  }
};