var canvasToBlob = require('blueimp-canvastoblob');
var origamiRenderer = require('./origami-renderer');
var stateManager = require('./state-manager');
var canvasBefore = document.querySelector('.canvas-before');
var canvasAfter = document.querySelector('.canvas-after');
var cw = 640;
var ch = 480;
var ctxBefore, ctxAfter;
var sourceType, sourceEl;

var frameTimer;

var getContext = function(canvas) {
  canvas.width = cw;
  canvas.height = ch;
  var ctx = canvas.getContext('2d');

  return ctx;
};

var drawImage = function(ctx) {
  ctx.save();
  if (sourceType == 'video') {
    ctx.translate(cw, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(sourceEl, 0, 0, cw, ch);
  ctx.restore();
};

var renderFrame = function() {
  drawImage(ctxBefore);

  if (sourceType == 'video') {
    ctxBefore.beginPath();
    ctxBefore.ellipse(cw * 0.5, ch * 0.5, cw * 0.16, ch * 0.3, 0, 0, 2 * Math.PI);
    ctxBefore.stroke();
  }

  drawImage(ctxAfter);

  origamiRenderer.renderFrame(sourceEl, ctxAfter, cw, ch);

  if (sourceType == 'video') {
    frameTimer = setTimeout(renderFrame, 5);
  }
};

var render = function() {
  clearTimeout(frameTimer);

  if (! sourceEl) return;

  ctxBefore = getContext(canvasBefore);
  ctxAfter = getContext(canvasAfter);

  renderFrame();
};

var renderFromVideo = function(el) {
  sourceEl = el;
  sourceType = 'video';

  render();
};

var renderFromImage = function(el) {
  sourceEl = el;
  sourceType = 'image';

  render();
};

var getImage = function() {
  clearTimeout(frameTimer);
  return canvasAfter.toDataURL.call(canvasAfter, 'image/png');
};

var getImageUrl = function(cb) {
  stateManager.addState('loading');

  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload', true);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 400) {
      stateManager.removeState('loading');
      var data = JSON.parse(xhr.responseText);
      cb(data);
    } else {
      stateManager.removeState('loading');
      window.alert('Something went wrong. Sorry!');
      console.log(xhr.responseText || 'failed to upload image');
    }
  };

  var image = getImage();
  var formData = new FormData();
  var imageBlob = canvasToBlob(image);
  formData.append('image', imageBlob);

  xhr.send(formData);

};

var changeProcedure = function() {
  origamiRenderer.changeType(this.getAttribute('data-procedure'));

  render();

  return false;
};

var procedures = document.querySelectorAll('[data-procedure]');
for (var i = procedures.length - 1; i >= 0; i--) {
  procedures[i].addEventListener('click', changeProcedure.bind(procedures[i]), false);
}

module.exports = {
  render: render,
  renderFromVideo: renderFromVideo,
  renderFromImage: renderFromImage,
  getImage: getImage,
  getImageUrl: getImageUrl
};
