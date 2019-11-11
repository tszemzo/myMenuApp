const Sequelize = require('sequelize');
var Menu = require("../models").Menu;

class MenuRepo {


    getMenu(id){
        return Menues.findOne({
            where:{
                id: id
            }
        })
    }

    getMenu(){ //menus? menues?
        return Menu.findAll()
    };

    createMenu(name, information, discount){
        return Menu.create({
            name: name,
            information: information,
            discount: discount
        })
    };

    updateMenu(id,name, information, discount){
        let nameField = (name)? 'name' : undefined
        let infoField = (information)? 'information' : undefined
        let discountField = (discount)? 'discount': undefined
        return Menu.findOne({
            where: {
                id: id
            }
        }).then(menu => {
            return menu.update({ name: name, information: information, discount: discount},{ fields: [nameField, infoField, discountField]})
        })
    };


    deleteMenu(id){
        return Menu.destroy({
            where: {
                id: id
            }
        })
    };
}

module.exports = new MenuRepo();