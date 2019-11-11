const Sequelize = require('sequelize');
var FoodTypes = require("../models").FoodTypes;

class FoodTypesRepo {

    getAll(){
        return FoodTypes.findAll()
    }

    get(id){
        return FoodTypes.findOne({
            where:{
                id: id
            }
        })
    }
}

module.exports = new FoodTypesRepo();