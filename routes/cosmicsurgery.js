var router = require('express').Router();
var counter = require('./helpers/counter');

router.get('/', function(req, res) {
  var pageImage;
  if (req.query.share) {
    pageImage = 'http://d2csffd0gyvkmk.cloudfront.net/images/' + req.query.share + '.png';
  }

  counter.get(req)
  .catch(function() {
  })
  .then(function(result) {
    var count = result && result.count || 0;
    res.render('cosmic-surgery', {
      pageImage: pageImage,
      count: count
    });
  });

});

module.exports = router;
