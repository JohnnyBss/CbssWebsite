var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '交通银行服务档案管理系统', bodyClass: '' });
});

module.exports = router;
