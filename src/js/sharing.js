var gator = require('gator');
var stateManager = require('./state-manager');
var renderer = require('./renderer');
var buttonsTmpl = require('../../views/partials/shareButtons.handlebars');
var waitTmpl = require('../../views/partials/shareWait.handlebars');
var chooseTmpl = require('../../views/partials/shareChoose.handlebars');

var shareUrl;

var render = function(tmpl, opts) {
  document.querySelector('.share').innerHTML = tmpl(opts);
};

var shareLocations = {
  facebook: 'https://www.facebook.com/dialog/share?app_id=1659003591054240&display=popup&href={{url}}&redirect_uri={{url}}&description={{text}}',
  twitter: 'http://www.twitter.com/share?text={{text}}&url={{url}}&hashtags=cosmicsurgery'
};

var share = function() {
  var type = this.getAttribute('data-share');
  render(waitTmpl);

  renderer.getImageUrl(function(data) {
    shareUrl = 'https://cosmic-surgery.herokuapp.com?share=' + data.id;

    render(chooseTmpl, {
      type: type,
      isDownload: type == 'download',
      downloadUrl: data.url
    });
  });
};

var choose = function() {
  var type = this.getAttribute('data-choose');

  if (type == 'retry') {
    render(buttonsTmpl);
    renderer.render();
    // retry
  } else {
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
  }
};

var init = function() {
  gator(document).on('click', '[data-share]', share);
  gator(document).on('click', '[data-choose]', choose);
};

module.exports = {
  init: init
};
