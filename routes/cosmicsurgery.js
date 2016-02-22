var router = require('express').Router();

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

  res.render('cosmic-surgery', {
    procedures: procedures,
    pageImage: pageImage
  });
});

module.exports = router;
