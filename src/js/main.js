var mediaDevices = require('./media-devices');
var canvas = require('./canvas');

var video = document.getElementById('video');

video.addEventListener('play', canvas.draw.bind(canvas), false);
window.addEventListener('resize', canvas.draw.bind(canvas), false);

if (! mediaDevices.getUserMedia) {
  console.log('getUserMedia not supported');
  // handle fallback
} else {
  mediaDevices.getUserMedia({
    video: {
      mandatory: {
        minWidth: 1280,
        minHeight: 720
      }
    }
  }, function success(stream) {
    video.src = window.URL.createObjectURL(stream);
  }, function error(err) {
    console.log(err);
  });
}
