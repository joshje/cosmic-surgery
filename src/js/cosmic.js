var gator = require('gator');
var mediaDevices = require('./media-devices');
var renderer = require('./renderer');
var stateManager = require('./state-manager');

var init = function() {
  window.console = window.console || {
    log: function() {}
  };

  var video = document.querySelector('.video-src');
  var img = document.querySelector('.img-src');

  gator(video).on('play', function() {
    stateManager.removeState('loading');
    stateManager.showShare('capture');
    renderer.renderFromVideo(video);
  });

  img.crossOrigin = 'Anonymous';
  gator(img).on('load', function() {
    stateManager.removeState('loading');
    renderer.renderFromImage(img);
  });

  gator(window).on('resize', renderer.render);

  if (mediaDevices.getUserMedia) {
    stateManager.addState('supports-usermedia');
  }

  gator(document).on('click', '.select-usermedia', function() {
    window.ga('send', 'event', 'begin', 'video');
    if (! mediaDevices.getUserMedia) return;
    stateManager.addState('loading');
    stateManager.addState('show-access');
    stateManager.showSurgery();
    renderer.init();
    stateManager.hideShare();

    mediaDevices.getUserMedia({
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720
        }
      }
    }, function success(stream) {
      stateManager.removeState('show-access');
      video.src = window.URL.createObjectURL(stream);
    }, function error(err) {
      stateManager.removeState('show-access');
      stateManager.removeState('loading');
      stateManager.removeState('supports-usermedia');
      stateManager.showStart();

      console.log(err);
    });

    return false;
  });

  gator(document).on('change', '.select-image', function(evt) {
    window.ga('send', 'event', 'begin', 'image');
    stateManager.addState('loading');
    stateManager.showSurgery();
    renderer.init();

    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/upload', true);

    xhr.onload = function() {
      if (xhr.status >= 200 && xhr.status < 400) {
        var data = JSON.parse(xhr.responseText);
        img.src = data.url;
      } else {
        stateManager.removeState('loading');
        window.alert('Are you sure that was an image?');
        console.log(xhr.responseText || 'failed to upload image');
      }
    };

    var formData = new FormData();
    formData.append('image', evt.target.files[0]);

    xhr.send(formData);
  });
};

module.exports = {
  init: init
};
