var renderer = require('./renderer');

var shareLocations = {
  facebook: 'https://www.facebook.com/dialog/share?app_id=1659003591054240&display=popup&href={{url}}&redirect_uri={{url}}&caption={{text}}',
  twitter: 'http://www.twitter.com/share?text={{text}}&url={{url}}&hashtags=cosmicsurgery'
};

var share = function(evt) {
  var type = evt.target.getAttribute('data-type');

  renderer.getImageUrl(function(data) {
    var shareLocation = shareLocations[type]
    .replace(/{{url}}/g, encodeURIComponent('https://cosmic-surgery.herokuapp.com?share=' + data.id))
    .replace(/{{text}}/g, encodeURIComponent('Give yourself a cosmic facelift'));
    window.location = shareLocation;
  });
};

var download = function(evt) {
  var image = renderer.getImage();
  evt.target.href = image;
};

var init = function() {
  var downloadButton = document.querySelector('.btn-download');
  downloadButton.addEventListener('click', download, false);

  var sharingButtons = document.querySelectorAll('.btn-share');
  for (var i = sharingButtons.length - 1; i >= 0; i--) {
    sharingButtons[i].addEventListener('click', share, false);
  }
};

module.exports = {
  init: init
};
