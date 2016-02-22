var router = require('express').Router();
var counter = require('./helpers/counter');

router.get('/', function(req, res) {
  counter.get(req)
  .then(function(result) {
    res.json(result);
  })
  .catch(function() {
    res.status(500).json({
      error: true
    });
  });
});

router.post('/increment', function(req, res) {
  counter.increment(req)
  .then(function() {
    res.json({
      success: true
    });
  })
  .catch(function() {
    res.status(500).json({
      error: true
    });
  });
});

module.exports = router;
