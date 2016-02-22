var gator = require('gator');
var canvasToBlob = require('blueimp-canvastoblob');
var origamiRenderer = require('./origami-renderer');
var stateManager = require('./state-manager');
var cw = 720;
var ch = 720;
var ctxBefore, ctxAfter;
var source = {};

var canvasBefore;
var canvasAfter;

var frameTimer;

var init = function() {
  canvasBefore = document.querySelector('.canvas-before');
  canvasAfter = document.querySelector('.canvas-after');
};

var getContext = function(canvas) {
  canvas.width = cw;
  canvas.height = ch;
  var ctx = canvas.getContext('2d');

  return ctx;
};

var drawImage = function(ctx) {
  ctx.save();
  if (source.type == 'video') {
    ctx.translate(cw, 0);
    ctx.scale(-1, 1);
  }

  ctx.drawImage(source.el, (source.width - cw) / 2, (source.height - ch) / 2, cw, ch, 0, 0, cw, ch);
  ctx.restore();
};

var renderFrame = function() {
  drawImage(ctxBefore);

  if (source.type == 'video') {
    ctxBefore.save();
    ctxBefore.strokeStyle = '#54BFAD';
    ctxBefore.lineWidth = 5;
    ctxBefore.setLineDash([20, 15]);
    ctxBefore.beginPath();
    ctxBefore.ellipse(cw * 0.5, ch * 0.5, cw * 0.25, ch * 0.35, 0, 0, 2 * Math.PI);
    ctxBefore.stroke();
    ctxBefore.restore();
  }

  drawImage(ctxAfter);

  origamiRenderer.renderFrame(source, ctxAfter, cw, ch);

  if (source.type == 'video') {
    frameTimer = setTimeout(renderFrame, 5);
  }
};

var render = function() {
  clearTimeout(frameTimer);

  if (! source.el) return;

  ctxBefore = getContext(canvasBefore);
  ctxAfter = getContext(canvasAfter);

  renderFrame();
};

var renderFromVideo = function(el) {
  source.el = el;
  source.type = 'video';
  source.width = el.videoWidth;
  source.height = el.videoHeight;
  origamiRenderer.init(source);

  render();
};

var renderFromImage = function(el) {
  source.el = el;
  source.type = 'image';
  source.width = 720;
  source.height = 720;
  origamiRenderer.init(source);

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
  var activeEl = document.querySelector('[data-procedure].active');
  activeEl.className = activeEl.className.replace(/active/g, '');
  origamiRenderer.changeType(this.getAttribute('data-procedure'));
  this.className += ' active';

  render();

  return false;
};

gator(document).on('click', '[data-procedure]', changeProcedure);

module.exports = {
  init: init,
  render: render,
  renderFromVideo: renderFromVideo,
  renderFromImage: renderFromImage,
  getImage: getImage,
  getImageUrl: getImageUrl
};
