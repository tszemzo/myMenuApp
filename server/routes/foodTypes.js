var express = require('express');
var foodTypes = require('../repositories/foodTypes');
var router = express.Router();
var app = express();

router.get('/', function(req, res) {

    foodTypes.getAll().then( foodTypes => {

        res.json({
            methods: foodTypes
        });

    }).catch(err => {
        res.json({
            error: err
        });
    })
});

router.get('/:id', function(req, res) {

    let id = req.params.id;

    foodTypes.get(id).then( method => {

        res.json({
            method: method
        });

    }).catch((err) => {
        res.status(404);
        res.json({
            error: err
        })
    })

});


module.exports = router
