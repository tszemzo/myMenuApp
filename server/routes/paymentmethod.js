var express = require('express');
var paymentMethodRepo = require('../repositories/paymentmethod');
var router = express.Router();
var app = express();

router.get('/', function(req, res) {

  paymentMethodRepo.getAllPaymentMethods().then( methods => {

    res.json({
      methods: methods
    });

  }).catch(err => {
  	res.json({
  		error: err
  	});
  })
});

router.get('/:id', function(req, res) {
  
  let id = req.params.id;

  paymentMethodRepo.getPaymentMethod(id).then( method => {

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

router.delete('/:id', function(req, res) {
  
  let id = req.params.id;

  paymentMethodRepo.deletePaymentMethod(id).then( method => {

	res.json({
		method: method
  });

  }).catch((err) => {
  	res.status(404);
  	res.json({
			error: err
	});
  })
  
});



router.post('/', function(req, res) {
  let {name, paymentImage} = req.body;

  paymentMethodRepo.createPaymentMethod(name, paymentImage).then(result => {
    res.json(result)
	}).catch(err => {
		res.json({
			error: err
		});
	})
})

router.put('/:id', function(req, res) {
	paymentMethodRepo.updatePaymentMethod(req.body).then( result => {
		res.json({
			method: result,
		})
	}).catch(err => {
		res.json({
			error: err
		});
	})
})


module.exports = router
