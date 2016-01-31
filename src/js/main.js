var cosmic = require('./cosmic');
var stateManager = require('./state-manager');

if (window.location.search.indexOf('debug') !== -1) {
  window.debug = true;
}

if ('FormData' in window) {
  cosmic.init();
} else {
  // IE 9 and below don't support file uploads via AJAX
  // handle no support
  document.getElementById('not-supported').innerHTML = '<p>Sorry, your browser is not supported. Try Chrome or Firefox instead.</p>';
  stateManager.addState('not-supported');
}
