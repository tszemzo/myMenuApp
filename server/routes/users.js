var express = require('express');
var userRepo = require('../repositories/users');
var router = express.Router();
var app = express();


// router.get('/checkToken', withAuth, function(req, res) {
//   res.sendStatus(200);
// });

router.get('/', function(req, res) {

  userRepo.getAllUsers().then( users => {

    res.json({
      users: users
    });

  }).catch(err => {
  	//res.status(err.code);
  	res.json({
  		error: err
  	});
  })
  
});

router.get('/:username', function(req, res) {
  
  let username = req.params.username;

  userRepo.getUser(username).then( user => {

  res.json({
    user: user
    });

  }).catch((err) => {
    res.status(404);
    res.json({
      error: err
    })
  })
  
});

router.post('/authenticate', function(req, res) {
  
  let user = req.body.username;
  let pass = req.body.password;

  userRepo.authenticateUser(user, pass).then( token => {

    //res.cookie('token', token, { httpOnly: true })
    
    res.json({
      result: 'OK',
      token: token,
    });

  }).catch((err) => {
    userRepo.createUser(user, pass).then( result => {
      res.json({
        user: result.username,
        token: result.token
      })
    }).catch(err => {
      res.json({
        error: err
      });
    })
  })
  
});

router.delete('/:username', function(req, res) {
  
  let username = req.params.username;

  userRepo.deleteUser(username).then( user => {

	res.json({
		user: user
  	});

  }).catch((err) => {
  	res.status(404);
  	res.json({
			error: err
	});
  })
  
});

router.delete('/user', function(req, res) {
  
  userRepo.deleteUsers().then( result => {

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

router.post('/user', function(req, res) {
  let user = req.body;
	userRepo.createUser(user).then( result => {
		res.json({
			user: result.username,
		})
	}).catch(err => {
		res.json({
			error: err
		});
	})
})

router.put('/user', function(req, res) {
	userRepo.updateUser(req.body).then( result => {
		res.json({
			user: result,
		})
	}).catch(err => {
		res.json({
			error: err
		});
	})
})


module.exports = router
