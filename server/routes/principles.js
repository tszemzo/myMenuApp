const express = require('express');
const router = express.Router();
const activePrinciplesRepo = require('../repositories/activePrinciples');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

router.get('/:id',function(req, res){
	activePrinciplesRepo.getActivePrinciple(req.params.id).then(activePrinciple => {
		res.json(principle)
	}).catch(err => {
		res.send(err)
	})
})

router.get('/', function(req, res, next) {
	activePrinciplesRepo.getAllActivePrinciples().then(principles => {
		res.json({
			principles
		})
	})
});

router.post('/', (req, res, next) => {
	const { name, information } = req.body
	if(!name || !information){
		res.status(400)
		res.send("No name or information")
	}
	activePrinciplesRepo.createActivePrinciple(name, information).then(principle => {
		res.json(principle)
	})
})

router.put('/:id', (req, res, next) => {
	const { name, information } = req.body
	console.log(req.body)
	activePrinciplesRepo.updateActivePrinciple(req.params.id,name, information).then(principle => {
		res.json({
			principle
		})
	}).catch(err => {
		res.status(400)
		res.send(err.message)
	})
})

router.delete('/:id', (req, res, next) => {
	const { name, information } = req.body
	activePrinciplesRepo.deleteActivePrinciple(req.params.id).then(principle => {
		res.json({
			principle
		})
	}).catch(err => {
		res.status(400)
		res.send(err.message)
	})
})

module.exports = router;
