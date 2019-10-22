const Sequelize = require('sequelize');
var Products = require("../models").Product;
var ProductActivePrinciple = require("../models").ProductActivePrinciple;
var ActivePrinciples = require("../models").ActivePrinciples;
var Images = require("../models").Images;
var Formats = require("../models").Formats;

class ProductsRepo {
	getProduct(id){
		return Products.findOne({
			where:{
				id: id
			},
			include:[{
				model: Images
			},{
				model: Formats
			},{
				model: ActivePrinciples
			}]
		});

	}
	getAllProducts(){
		return Products.findAll({
			include:[{
				model: Images
			},{
				model: Formats
			},{
				model: ActivePrinciples
			}]
		});
	};

	changeProductData( productId, name, code, info, activePrinciples, images, formats){
		let _self = this
		return Products.findOne({
			where: {
				id: productId
			},
			include:[{
				model: ActivePrinciples
			},{
				model: Images
			},{
				model: Formats
			},]
		}).then(product => {
			let newData = {
				name: name,
				code: code,
				description: info
			}
			product.update(newData).then(product => {
				let removedPrincipleList = []
				let removedPhotoList = []
				let removedFormatList = []
				product.Images.forEach(image => {
					if(images.includes(image.link)){
						images.splice(images.indexOf(image.link),1)
					}else{
						removedPhotoList.push(image.id)
					}
				})
				product.Formats.forEach(format => {
					if(formats.includes(format.info)){
						formats.splice(formats.indexOf(format.info),1)
					}else{
						removedFormatList.push(format.id)
					}
				})
				product.ActivePrinciples.forEach(principle => {
					if(activePrinciples.includes(principle.id)){
						activePrinciples.splice(activePrinciples.indexOf(principle.id),1)
					}else{
						removedPrincipleList.push(principle.id)
					}
				})
				return _self.updateLinks(product.id, activePrinciples, removedPrincipleList).then(data => {
					return _self.updatePhotos(product.id, images, removedPhotoList).then(data => {
						return _self.updateFormats(product.id, formats, removedFormatList).then(data => {
							return _self.getProduct(product.id)
						})
					})
				})
			})
		})

	}

	updatePhotos(productId, newList, removedList){
		let newRegisters = []
		newList.forEach(link => {
			newRegisters.push({
				productId,
				link
			})
		})
		Images.destroy({
			where:{
				link: removedList,
				productId
			}
		})
		return Images.bulkCreate(newRegisters)
	}

	updateFormats(productId, newList, removedList){
		let newRegisters = []
		newList.forEach(info => {
			newRegisters.push({
				productId,
				info
			})
		})
		Formats.destroy({
			where:{
				info: removedList,
				productId
			}
		})
		return Formats.bulkCreate(newRegisters)
	}

	updateLinks(productId, newList, removedList){
		let newRegisters = []
		newList.forEach(activePrincipleId => {
			newRegisters.push({
				productId,
				activePrincipleId
			})
		})
		ProductActivePrinciple.destroy({
			where:{
				activePrincipleId: removedList,
				productId
			}
		})
		return ProductActivePrinciple.bulkCreate(newRegisters)
	}

	addNewProduct(name, code, info){
		return Products.create({
			name: name,
			code: code,
			description: info
		})
	};

	linkProductAndPrinciple(productId, principleList){
		let newRegisters = []
		principleList.forEach(activePrincipleId => {
			newRegisters.push({
				productId,
				activePrincipleId
			})
		})
		return ProductActivePrinciple.bulkCreate(newRegisters)
	}

	deleteProduct(productId){
		return Products.findOne({
			where: {
				id: productId
			},
			include: [{
				model: Images
			},{
				model: Formats	
			}]
		}).then( product => {
			product.Images.forEach(img => {
				img.destroy()
			})
			product.Formats.forEach(img => {
				img.destroy()
			})
			return product.destroy()
		})
	}
}

module.exports = new ProductsRepo();
