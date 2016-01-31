var cosmic = require('./cosmic');

if (window.location.search.indexOf('debug') !== -1) {
  window.debug = true;
}

if ('FormData' in window) {
  cosmic.init();
} else {
  // IE 9 and below don't support file uploads via AJAX
  // handle no support
  window.alert('Your browser is not supported (we need to display a message)');
  document.querySelector('.source-select').html = 'Sorry, your browser is not supported. Try Chrome or Firefox instead.';
}
