var mediaDevices = require('./media-devices');
var renderer = require('./renderer');

var init = function() {
  var video = document.querySelector('.video-src');
  var img = document.querySelector('.img-src');

  video.addEventListener('play', function() {
    renderer.renderFromVideo(video);
  }, false);
  img.addEventListener('load', function() {
    renderer.renderFromImage(img);
  }, false);
  window.addEventListener('resize', renderer.render, false);

  var downloadButton = document.querySelector('.btn-download');
  downloadButton.addEventListener('click', function () {
    var image = renderer.getImage();
    downloadButton.href = image;
    return false;
  }, false);

  if (mediaDevices.getUserMedia) {
    document.body.className += ' supports-usermedia';
  }

  var selectUserMedia = document.querySelector('.select-usermedia');
  selectUserMedia.addEventListener('click', function() {
    if (! mediaDevices.getUserMedia) return;

    mediaDevices.getUserMedia({
      video: {
        mandatory: {
          minWidth: 640,
          minHeight: 480
        }
      }
    }, function success(stream) {
      document.body.className += ' show-canvas';
      video.src = window.URL.createObjectURL(stream);
    }, function error(err) {
      document.body.className = document.body.className.replace('supports-usermedia', '');
      document.body.className = document.body.className.replace('source-set', '');
      console.log(err);
    });

    return false;
  }, false);

  var selectImage = document.querySelector('.select-image');
  selectImage.addEventListener('change', function(evt) {
    document.body.className += ' show-canvas';
    img.src = URL.createObjectURL(evt.target.files[0]);
  }, false);
};

module.exports = {
  init: init
};
