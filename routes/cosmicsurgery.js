var router = require('express').Router();
var counter = require('./helpers/counter');

router.get('/', function(req, res) {
  var procedures = [
    {
      name: 'icosahedron',
      label: 'Icosahedron'
    },
    {
      name: 'test',
      label: 'Test'
    }
  ];

  var pageImage;
  if (req.query.share) {
    pageImage = 'http://d2csffd0gyvkmk.cloudfront.net/images/' + req.query.share + '.png';
  }

  counter.get(req)
  .catch(function() {
  })
  .then(function(result) {
    var count = result && result.count + 1 || 'null';
    res.render('cosmic-surgery', {
      procedures: procedures,
      pageImage: pageImage,
      count: count
    });
  });

});

module.exports = router;
