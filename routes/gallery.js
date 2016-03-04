var router = require('express').Router();
var gallery = require('./helpers/gallery');

router.post('/permit', function(req, res) {
  gallery.permit(req, req.query.id)
  .then(function(result) {
    res.json(result);
  })
  .catch(function() {
    res.status(500).json({
      error: true
    });
  });
});

module.exports = router;
