var express = require('express');
var router = express.Router();
var multiparty = require("multiparty");
var UserModel = require('../model/UserModel');
var GoodsModel = require('../model/GoodsModel');
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
router.get('/api/goods_del', function(req, res, next) {
  GoodsModel.findByIdAndRemove({_id: req.query.gid},function(err){
  	var result = {
  		status: 1,
  		message: "商品删除成功"
  	};
  	if(err){
  		result.status = -119;
  		result.message = "删除失败";
  	}
  	res.send(result);
  })
});
router.get('/goods', function(req, res, next) {
	var pageNo = parseInt(req.query.pageNo || 1);
	var count = parseInt(req.query.count || 3);
	var gname = req.query.kword;
	var query = GoodsModel.find({goods_name: new RegExp(gname)}).skip((pageNo-1)*count).limit(count).sort({date: -1});
	query.exec(function(err,result){
		console.log(result)
		res.render("goods",{list: result,pageNo: pageNo,count: count});
	})
  // GoodsModel.find({},function(err,docs){
  // 	res.render("goods",{list:docs});
  // })
});
router.post("/api/add_goods",function(req,res){
	var form = new multiparty.Form({
		uploadDir: "./public/images"
	});
	form.parse(req,function(err,body,files){
		var goods_name = body.goods_name[0];
		var price = body.price[0];
		var imgName = files.img[0].path;
		imgName = imgName.substr(imgName.lastIndexOf("\\") + 1 )
		console.log(goods_name,price,imgName);
		var gm = new GoodsModel();
		gm.goods_name = goods_name;
		gm.price = price;
		gm.img = imgName;
		gm.save(function(err){
			if (!err) {
				res.send("文件上传成功");
			}else{
				res.send("文件上传失败")
			}
		})
	})
})
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
