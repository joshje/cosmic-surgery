var supportsCanvas = require('./supports-canvas');
var cosmic = require('./cosmic');

if (window.location.search.indexOf('debug') !== -1) {
  window.debug = true;
}

if (! supportsCanvas) {
  // handle no support
  window.alert('Your browser is not supported (we need to display a message)');
  document.getElementById('source-select').html = 'Sorry, your browser is not supported. Try Chrome or Firefox instead.';
} else {
  cosmic.init();
}
