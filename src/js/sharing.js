var gator = require('gator');
var stateManager = require('./state-manager');
var renderer = require('./renderer');

var captureTmpl = require('../../views/partials/share/capture.handlebars');
var waitTmpl = require('../../views/partials/share/wait.handlebars');
var shareTmpl = require('../../views/partials/share/share.handlebars');

var shareUrl;

var render = function(tmpl, opts) {
  document.querySelector('.share').innerHTML = tmpl(opts);
};

var shareLocations = {
  facebook: 'https://www.facebook.com/dialog/share?app_id=1659003591054240&display=popup&href={{url}}&redirect_uri={{url}}&description={{text}}',
  twitter: 'http://www.twitter.com/share?text={{text}}&url={{url}}&hashtags=cosmicsurgery'
};

var capture = function() {
  render(waitTmpl);

  renderer.getImageUrl(function(data) {
    shareUrl = 'https://cosmic-surgery.herokuapp.com?share=' + data.id;

    render(shareTmpl, {
      downloadUrl: data.url
    });
  });

  return false;
};

var share = function() {
  var type = this.getAttribute('data-share');

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

  return false;
};

var retry = function() {
  render(captureTmpl);
  renderer.render();

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
