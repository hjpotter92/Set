var express = require('express'),
	router = express.Router();
	
router.route('/puzzle')
	
	// query for a new puzzle
	.get(function(req, res){
		res.send({message: 'todo'});
	})
	
	// send stats for completed puzzle
	.post(function(req, res){
		res.send({message: 'todo'});
	});
	
module.exports = router;