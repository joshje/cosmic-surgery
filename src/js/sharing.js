var gator = require('gator');
var stateManager = require('./state-manager');
var renderer = require('./renderer');

var shareLocations = {
  facebook: 'https://www.facebook.com/dialog/share?app_id=1659003591054240&display=popup&href={{url}}&redirect_uri={{url}}&description={{text}}',
  twitter: 'http://www.twitter.com/share?text={{text}}&url={{url}}&hashtags=cosmicfacelift'
};

var capture = function() {
  window.ga('send', 'event', 'capture', 'capture');
  stateManager.showShare('wait');

  renderer.getImageUrl(function(data) {
    stateManager.showShare('share', {
      downloadUrl: data.url,
      shareId: data.id
    });

  });

  return false;
};

var addToGallery = function(id) {
  var http = new XMLHttpRequest();
  http.open('POST', '/gallery/permit?id=' + id, true);
  http.send();
};

var share = function() {
  var type = this.getAttribute('data-share');
  var id = this.getAttribute('data-share-id');
  var shareUrl = 'https://cosmicsurgery.co.uk/share/' + id;
  window.ga('send', 'event', 'share', type);

  var shareLocation = shareLocations[type]
  .replace(/{{url}}/g, encodeURIComponent(shareUrl))
  .replace(/{{text}}/g, encodeURIComponent('I gave myself a cosmic facelift!'));

  var sw = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var sh = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;

  var w = 600;
  var h = 400;
  var left = (sw - w) / 2;
  var top = (sh - h) / 2;

  window.open(shareLocation, 'cosmic-share', 'toolbar=0,scrollbars=0,location=0,statusbar=0,menubar=0,resizable=0,width=' + w + ',height=' + h + ',left=' + left + ',top=' + top);

  addToGallery(id);

  return false;
};

var retry = function() {
  window.ga('send', 'event', 'retry', 'retry');
  window.ga('send', 'pageview', '/');
  stateManager.showStart();

  return false;
};

var init = function() {
  gator(document).on('click', '[data-capture]', capture);
  gator(document).on('click', '[data-share]', share);
  gator(document).on('click', '[data-retry]', retry);
};

module.exports = {
  init: init
};
