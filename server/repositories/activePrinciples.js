const Sequelize = require('sequelize');
var ActivePrinciples = require("../models").ActivePrinciples;

class ActivePrinciplesRepo {

	addNewPrinciple(productId, activePrinciples){
		let aPrincipleList = []
		activePrinciples.forEach((aPrinciple) => {
			aPrincipleList.push({
				name:aPrinciple,
				productId: productId
			})
		})
		ActivePrinciples.bulkCreate(aPrinciples)
	};

	getActivePrinciple(id){
		return ActivePrinciples.findOne({
			where:{
				id: id
			}
		})
	}

	getPrinciplesByList(list){
		return ActivePrinciples.findAll({
			where:{
				id: list
			}
		})
	}


	getAllActivePrinciples(){
		return ActivePrinciples.findAll()
	};

	createActivePrinciple(name, information){
		return ActivePrinciples.create({
			name: name,
			information: information
		})
	};

	updateActivePrinciple(id,name, information){
		let nameField = (name)? 'name' : undefined
		let infoField = (information)? 'information' : undefined
		console.log(information, name, nameField, infoField, id)
		return ActivePrinciples.findOne({
			where: {
				id: id
			}
		}).then(activePrinciple => {
			return activePrinciple.update({ name: name, information: information},{ fields: [nameField, infoField]})
		})
	};


	deleteActivePrinciple(id){
		return ActivePrinciples.destroy({
			where: {
				id: id
			}
		})
	};
}

module.exports = new ActivePrinciplesRepo();