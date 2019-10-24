const Sequelize = require('sequelize');
var PaymentMethod = require("../models").PaymentMethod;

class PaymentMethodRepository{

	getAllPaymentMethods(){
		return PaymentMethod.findAll();
	}

	getPaymentMethod(id){
		return PaymentMethod.findOne({
			where: { id: id }
		});
	}

	deletePaymentMethod(id){
		return PaymentMethod.destroy({
			where: { id: id }
		});
	}

	deletePaymentMethods(){
		return PaymentMethod.destroy({
			where: {}
		});
	}

	createPaymentMethod(name, paymentImage){
		return PaymentMethod.create({
			name: name,
			paymentImage: paymentImage,
		})
	}

	updatePaymentMethod(id, name, paymentImage){
		return PaymentMethod.update({
			name: name,
			paymentImage: paymentImage,
		},
		{
			where: { id: id}
		});
	}

}

module.exports = new PaymentMethodRepository();
