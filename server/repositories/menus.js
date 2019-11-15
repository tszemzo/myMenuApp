const Sequelize = require('sequelize');
var Menus = require("../models").Menus;
var MenuProducts = require("../models").MenuProducts;
var Products = require("../models").Product;
var Images = require("../models").Images;

class MenusRepo {


    getMenu(id){
        return Menus.findOne({
            where:{
                id: id
            },include:[{
                model: Products,
                include: [{
                    model: Images
                }]
            }]
        })
    }

    getMenus(){ //menus? menues?
        return Menus.findAll({
            include:[{
                model: Products,
                include: [{
                    model: Images
                }]
            }]
        });
    };


    createMenu(name, info, discount){
        return Menus.create({
            name: name,
            description: info,
            discount: discount
        })
    };

    linkMenuAndProducts(menuId, productList){
        let newRegisters = []
        productList.forEach(productId => {
            newRegisters.push({
                menuId,
                productId
            })
        })
        return MenuProducts.bulkCreate(newRegisters)
    }


    deleteMenu(id){
        return Menus.destroy({
            where: {
                id: id
            }
        })
    };

    deleteMenuProducts(menuId){
        return MenuProducts.destroy({
            where:{
                menuId: menuId
            }
        })


    }
}

module.exports = new MenusRepo();