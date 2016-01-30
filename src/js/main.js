var mediaDevices = require('./media-devices');
var renderer = require('./renderer');

var video = document.getElementById('video');

if (window.location.search.indexOf('debug') !== -1) {
  window.debug = true;
}

video.addEventListener('play', renderer.draw, false);
window.addEventListener('resize', renderer.draw, false);

var button = document.getElementById('btn-download');
button.addEventListener('click', function () {
  var image = renderer.getImage();
  button.href = image;
  return false;
}, false);

if (! mediaDevices.getUserMedia) {
  window.alert('Try using Chrome or Firefox. Your browser is not supported (we need to display a message)');
  // handle fallback
} else {
  mediaDevices.getUserMedia({
    video: {
      mandatory: {
        minWidth: 640,
        minHeight: 480
      }
    }
  }, function success(stream) {
    video.src = window.URL.createObjectURL(stream);
  }, function error(err) {
    console.log(err);
  });
}
