var origamiRenderer = require('./origami-renderer');
var canvasBefore = document.getElementById('canvas-before');
var canvasAfter = document.getElementById('canvas-after');
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

module.exports = {
  render: render,
  renderFromVideo: renderFromVideo,
  renderFromImage: renderFromImage,
  getImage: function() {
    return canvasAfter.toDataURL.call(canvasAfter, 'image/png');
  }
};
