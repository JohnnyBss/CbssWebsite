var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('news', { title: '近期新闻' });
});

module.exports = router;
