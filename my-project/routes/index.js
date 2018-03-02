var express = require('express');
var router = express.Router();
var UserModel = require('../model/UserModel');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});
router.get('/addgoods', function(req, res, next) {
  res.render('addgoods', { title: 'Express' });
});
router.get('/goods', function(req, res, next) {
  res.render('goods', { title: 'Express' });
});
router.post('/api/login', function(req, res, next) {
	var result = {
		status : 1,
		message : "666"
	}
	UserModel.find({username:req.body.username,psw:req.body.psw},function(err,docs){
		if(!err && docs.length>0){
			res.send(result);
		}else{
			result.status = -999;
			result.message = "上车请买票";
			res.send(result);
		}
	})
});
module.exports = router;
