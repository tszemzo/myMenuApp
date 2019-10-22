const Sequelize = require('sequelize');
var Images = require("../models").Images;

class ImagesRepository {

	addNewImage(productId, imgLinkList){
		let imgList = []
		imgLinkList.forEach((link) => {
			imgList.push({
				productId: productId,
				link : link
			})
		})
		return Images.bulkCreate(imgList)
	};

	deleteImage(imgId){
		return Images.findOne({
			where: {
				id: imgId
			}
		}).then(img => {
			return img.destroy()
		})
	}
}

module.exports = new ImagesRepository();