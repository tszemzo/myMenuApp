'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Images', {
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
      link: {
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
      queryInterface.sequelize.query("INSERT INTO Images (id,link,createdAt,updatedAt,productId) VALUES (1,'https://i.pinimg.com/originals/6f/a4/7c/6fa47c6d3e1b7b4bb651f267590675a9.jpg','2019-11-18 21:46:58','2019-11-18 21:46:58',1);");
      queryInterface.sequelize.query("INSERT INTO Images (id,link,createdAt,updatedAt,productId) VALUES (2,'https://savvytokyo.scdn3.secure.raxcdn.com/app/uploads/2018/08/wine-pouring-slow-motion-shot-on-phantom-flex-4k_bepwavtzx_thumbnail-full10.png','2019-11-18 21:46:58','2019-11-18 21:46:58',2);");
      queryInterface.sequelize.query("INSERT INTO Images (id,link,createdAt,updatedAt,productId) VALUES (3,'http://otela.com/wp-content/uploads/2019/01/tiraminu-s.jpg','2019-11-18 21:46:58','2019-11-18 21:46:58',3);");
      queryInterface.sequelize.query("INSERT INTO Images (id,link,createdAt,updatedAt,productId) VALUES (4,'https://www.cookingclassy.com/wp-content/uploads/2018/09/salmon-creamy-garlic-dijon-sauce-1-768x1152.jpg','2019-11-18 21:46:58','2019-11-18 21:46:58',4);");
      queryInterface.sequelize.query("INSERT INTO Images (id,link,createdAt,updatedAt,productId) VALUES (5,'https://i.pinimg.com/564x/38/79/e2/3879e27b509c822e9ed7edb2c29c97a2.jpg','2019-11-18 21:46:58','2019-11-18 21:46:58',5);");
      queryInterface.sequelize.query("INSERT INTO Images (id,link,createdAt,updatedAt,productId) VALUES (6,'https://recetas-mexicanas.com.mx/wp-content/uploads/2014/03/cazuela-de-mariscos.jpg','2019-11-18 21:46:58','2019-11-18 21:46:58',6);");
      queryInterface.sequelize.query("INSERT INTO Images (id,link,createdAt,updatedAt,productId) VALUES (7,'https://i.pinimg.com/564x/24/d8/ce/24d8ce2b9be75749d7d5e5ec310916db.jpg','2019-11-18 21:46:58','2019-11-18 21:46:58',7);");
      queryInterface.sequelize.query("INSERT INTO Images (id,link,createdAt,updatedAt,productId) VALUES (8,'https://i.pinimg.com/564x/06/e2/7d/06e27d98ef7204626e958c87f25dabe2.jpg','2019-11-18 21:46:58','2019-11-18 21:46:58',8);");

    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Images');
  }
};