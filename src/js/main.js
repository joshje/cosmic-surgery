var cosmic = require('./cosmic');
var stateManager = require('./state-manager');
var sharing = require('./sharing');

if ('FormData' in window) {
  cosmic.init();
  sharing.init();
} else {
  // IE 9 and below don't support file uploads via AJAX
  // handle no support
  document.getElementById('not-supported').innerHTML = '<p>Sorry, your browser is not supported. Try Chrome or Firefox instead.</p>';
  stateManager.addState('not-supported');
}
