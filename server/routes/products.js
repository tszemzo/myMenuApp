const express = require('express');
const router = express.Router();
const productsRepository = require('../repositories/products');
const imagesRepository = require('../repositories/images');
const activePrinciplesRepository = require('../repositories/activePrinciples');
const formatsRepository = require('../repositories/formats');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id',function(req, res){
	return productsRepository.getProduct(req.params.id).then(product => {
		res.json({
			product
		})
	})
})

router.get('/', function(req, res, next) {
	return productsRepository.getAllProducts().then((products) => {
		products.forEach(product => {
			const { Images, Formats } = product
			let imageLinks = []
			let formatsInfo = []
			Images.forEach(image => {
				imageLinks.push(image.link)
			})
			Formats.forEach(format => {
				formatsInfo.push(format.info)
			})
			product.dataValues.images = imageLinks
			product.dataValues.formats = formatsInfo
		})
		res.json({
			products
		})
	})
});

router.post('/', function(req, res){
	let {name, code, info, activePrinciples} = req.body
	let images = req.body.img;
	let formats = req.body.format;
	productsRepository.addNewProduct(name, code, info).then((product) => {
		var productId = product.id;
		if(images)
			imagesRepository.addNewImage(productId, images).then(images => {
				formatsRepository.addNewFormat(productId, formats).then(formats=> {
					productsRepository.linkProductAndPrinciple(productId,activePrinciples).then(principles => {
						activePrinciplesRepository.getPrinciplesByList(activePrinciples).then(principles => {
							let imageLinks = []
							let formatsInfo = []
							let principlesList = []
							images.forEach(image => {
								imageLinks.push(image.link)
							})
							formats.forEach(format => {
								formatsInfo.push(format.info)
							})
							principles.forEach(principle => {
								if(activePrinciples.includes(principle.id))
									principlesList.push(principle)
							})
							product.dataValues.images = imageLinks
							product.dataValues.formats = formatsInfo
							product.dataValues.ActivePrinciples = principlesList
							res.json(product)

						})

					})
				})
			})
	});
})

router.put('/:id',function(req, res){
	let productId = req.params.id;
	let { code, info, name, activePrinciples, img, format } = req.body
	productsRepository.changeProductData(productId, name, code, info, activePrinciples, img, format).then((product) => {
		res.json(product)
	})

})

router.delete('/:id',function(req, res){
	productsRepository.deleteProduct(req.params.id).then(product => {
		res.json(product)
	})
})

router.delete('/picture/:pictureId',function(req, res){
	imagesRepository.deleteImage(req.params.pictureId)
		.then(data => {
			res.json(data)
		})

})

router.delete('/format/:formatId',function(req, res){
		formatsRepository.deleteFormat(req.params.formatId)
		.then(data => {
			res.json(data)
		})

})

router.post('/:productId/picture',function(req, res){
	let productId = req.params.productId;
	let images = req.body.imgList;
	imagesRepository.addNewImage(productId, images).then((imgs) => {
		res.json(imgs)
	})

})

router.post('/:productId/format',function(req, res){
	let productId = req.params.productId;
	let formats = req.body.format;
	formatsRepository.addNewFormat(productId, formats).then((formats) => {
		res.json(formats)
	})

})
module.exports = router;
