const Sequelize = require('sequelize');
var Products = require("../models").Product;
var ProductActivePrinciple = require("../models").ProductActivePrinciple;
var ActivePrinciples = require("../models").ActivePrinciples;
var Images = require("../models").Images;

class ProductsRepo {
	getProduct(id){
		return Products.findOne({
			where:{
				id: id
			},
			include:[{
				model: Images
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
				model: ActivePrinciples
			}]
		});
	};

	getProductByList(list){
		return Products.findAll({
			where:{
				id: list
			}
		})
	}

	changeProductData( productId, name, info, price, activePrinciples, images, foodTypeId){
		let _self = this
		return this.getProduct(productId).then(product => {
			let newData = {
				name: name,
				description: info,
				price: price,
				foodTypeId: foodTypeId
			}

			product.update(newData).then(product => {
				let removedPrincipleList = []
				let removedPhotoList = []

				product.Images.forEach(image => {
					if(images.includes(image.link)){
						images.splice(images.indexOf(image.link),1)
					}else{
						removedPhotoList.push(image.link)
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
						return _self.getProduct(product.id)
					})
				})
			})
		})

	}

	updatePhotos(productId, newList, removedList){
		let newRegisters = []
		newList.forEach(link => {
			newRegisters.push({
				productId: productId,
				link : link
			})
		})
		Images.destroy({
			where:{
				link: removedList,
				productId: productId
			}
		})
		return Images.bulkCreate(newRegisters)
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
				productId: productId
			}
		})
		return ProductActivePrinciple.bulkCreate(newRegisters)
	}

	addNewProduct(name, info, price, foodTypeId){
		return Products.create({
			name: name,
			description: info,
			price: price,
			foodTypeId: foodTypeId

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
			}]
		}).then( product => {
			product.Images.forEach(img => {
				img.destroy()
			})
			return product.destroy()
		})
	}
}

module.exports = new ProductsRepo();
