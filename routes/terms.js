var router = require('express').Router();
var counter = require('./helpers/counter');

router.get('/', function(req, res) {
  res.render('terms');
});

module.exports = router;
