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

router.delete('/methods', function(req, res) {
  
  paymentMethodRepo.deletePaymentMethods().then( result => {

  res.json({
    result: result
  });

  }).catch((err) => {
    res.status(err.code);
    res.json({
      error: err
  });
  })
  
});

router.post('/method', function(req, res) {
  let {name, paymentImage} = req.body;

  paymentMethodRepo.createPaymentMethod(name, paymentImage).then(result => {
    res.json(result)
	}).catch(err => {
		res.json({
			error: err
		});
	})
})

router.put('/method', function(req, res) {
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
