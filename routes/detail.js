var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('detail', { title: '考评点明细' });
});

module.exports = router;
