var router = require('express').Router();
var gallery = require('./helpers/gallery');

router.get('/', function(req, res) {
  gallery.get(req)
  .then(function(results) {
    res.render('gallery', {
      gallery: results
    });
  });
});

router.post('/permit', function(req, res) {
  if (! req.query.id) {
    res.status(400).json({
      error: true,
      message: 'id required'
    });
  }
  gallery.permit(req, req.query.id)
  .then(function(result) {
    res.json({
      success: true
    });
  })
  .catch(function(err) {
    console.log('permit error', err);
    res.status(500).json({
      error: true
    });
  });
});

module.exports = router;
