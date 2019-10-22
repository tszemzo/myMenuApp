const Sequelize = require('sequelize');
var Formats = require("../models").Formats;

class FormatsRepo {

	getAll(){
		return Formats.findAll()
	}

	addNewFormat(productId, formats){
		let formatList = []
		formats.forEach((format) => {
			formatList.push({
				productId: productId,
				info : format
			})
		})
		return Formats.bulkCreate(formatList)
	};

	deleteFormat(formatId){
		return Formats.findOne({
			where: {
				id: formatId
			}
		}).then(format => {
			return format.destroy()
		})
	}
}

module.exports = new FormatsRepo();