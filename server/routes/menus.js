const express = require('express');
const router = express.Router();
const menuRepository = require('../repositories/menus');
const productsRepository = require('../repositories/products');


router.get('/:id',function(req, res){
    return menuRepository.getMenu(req.params.id).then((menu) => {

        productsRepository.getProductByList(menu.productIds).then((products) =>{
            menu.dataValues.products = products
            res.json(menu)

        })

    })
})

router.get('/', function(req, res, next) {
    return menuRepository.getMenus().then((menu) => {
        res.json({menu})
    })
});

router.post('/', function(req, res){
    let {name, info, discount, productIds} = req.body
    menuRepository.createMenu(name, info, discount).then((menu) => {
        var menuId = menu.id;
        menuRepository.linkMenuAndProducts(menuId, productIds).then( () =>{
            productsRepository.getProductByList(productIds).then((products) =>{
                menu.dataValues.products = products
                res.json(menu)

            })
        })
    })
})

router.delete('/:id',function(req, res){
    menuRepository.deleteMenu(req.params.id).then(menu => {
        menuRepository.deleteMenuProducts(req.params.id).then( () => {
            res.json(menu)
        })
    })
})



module.exports = router;
