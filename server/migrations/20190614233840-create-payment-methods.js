'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PaymentMethods', {
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
      paymentImage: {
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
      queryInterface.sequelize.query("INSERT INTO PaymentMethods (id,name,paymentImage,createdAt,updatedAt) VALUES (1,'efectivo','https://cdn.lavoz.com.ar/sites/default/files/styles/width_1072/public/nota_periodistica/248809_dolar_1560434058.jpg','2019-11-18 21:46:58','2019-11-18 21:46:58');");
      queryInterface.sequelize.query("INSERT INTO PaymentMethods (id,name,paymentImage,createdAt,updatedAt) VALUES (2,'tarjeta', 'https://www.mastercard.com.ar/content/dam/mccom/global/logos/logo-mastercard-mobile.svg','2019-11-18 21:46:58','2019-11-18 21:46:58');");
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PaymentMethods');
  }
};