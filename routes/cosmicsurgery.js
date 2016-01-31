module.exports = function(req, res) {
  var meta = [
    {
      property: 'og:title',
      content: 'Cosmic Surgery'
    },
    {
      property: 'og:description',
      content: 'Give yourself a cosmic facelift'
    },
    {
      property: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      property: 'twitter:site',
      content: '@cosmicsurgery'
    },
    {
      property: 'twitter:title',
      content: 'Cosmic Surgery'
    },
    {
      property: 'twitter:description',
      content: 'Give yourself a cosmic facelift'
    }
  ];
  if (req.query.share) {
    var imageUrl = 'http://d2csffd0gyvkmk.cloudfront.net/images/' + req.query.share + '.png';
    meta.push(
      {
        property: 'og:image',
        content: imageUrl
      },
      {
        property: 'twitter:image',
        content: imageUrl
      }
    );
  }
  res.render('cosmic-surgery', {
    meta: meta
  });
};
