var express = require('express');
var router = express.Router();

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
module.exports = router;
