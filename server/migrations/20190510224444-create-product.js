'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Products', {
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
      price: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      foodTypeId: {
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
      queryInterface.sequelize.query("INSERT INTO Products (id,name,description,price,foodTypeId,createdAt,updatedAt) values (1,'Lomo al champigñon', 'Delicioso sobre un colchon de champiñon bañado en salsa', 400, 2, '2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("INSERT INTO Products (id,name,description,price,foodTypeId,createdAt,updatedAt) values (2,'Copa de vino tinto', 'soveñe caviñon con gusto a leña', 300, 5, '2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("INSERT INTO Products (id,name,description,price,foodTypeId,createdAt,updatedAt) values (3,'Tiramisu', 'Delicioso postre para terminar la velada', 400, 3, '2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("INSERT INTO Products (id,name,description,price,foodTypeId,createdAt,updatedAt) values (4,'Salmon rosado', 'ahumado con finas hierbas', 500, 2, '2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("INSERT INTO Products (id,name,description,price,foodTypeId,createdAt,updatedAt) values (5,'Spaguettin', '', 400, 2, '2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("INSERT INTO Products (id,name,description,price,foodTypeId,createdAt,updatedAt) values (6,'Cazuela de mariscos', '', 650, 2, '2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("INSERT INTO Products (id,name,description,price,foodTypeId,createdAt,updatedAt) values (7,'Volvan de chocolate', '', 200, 3, '2019-11-10 05:01:08','2019-11-10 05:01:08')");
      queryInterface.sequelize.query("INSERT INTO Products (id,name,description,price,foodTypeId,createdAt,updatedAt) values (8,'Cheesecake', '', 200, 3, '2019-11-10 05:01:08','2019-11-10 05:01:08')");
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Products');
  }
};