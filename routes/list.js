var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('list', { title: '考评点列表' });
});

module.exports = router;
