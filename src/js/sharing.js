var gator = require('gator');
var stateManager = require('./state-manager');
var renderer = require('./renderer');

var shareUrl;

var shareLocations = {
  facebook: 'https://www.facebook.com/dialog/share?app_id=1659003591054240&display=popup&href={{url}}&redirect_uri={{url}}&description={{text}}',
  twitter: 'http://www.twitter.com/share?text={{text}}&url={{url}}&hashtags=cosmicsurgery'
};

var share = function() {
  renderer.getImageUrl(function(data) {
    shareUrl = 'https://cosmic-surgery.herokuapp.com?share=' + data.id;
    stateManager.addState('show-modal');
    stateManager.addState('show-share-options');
  });
};

var shareOption = function(evt) {
  stateManager.setStage('complete');
  var type = evt.target.getAttribute('data-type');

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
};

var download = function(evt) {
  var image = renderer.getImage();
  evt.target.href = image;
};

var init = function() {
  gator(document).on('click', '.btn-download', download);
  gator(document).on('click', '.btn-share', share);
  gator(document).on('click', '.btn-share-option', shareOption);
};

module.exports = {
  init: init
};
