var origamiRenderer = require('./origami-renderer');
var canvasBefore = document.getElementById('canvas-before');
var canvasAfter = document.getElementById('canvas-after');
var video = document.getElementById('video');
var cw, ch;
var ctxBefore, ctxAfter;

var drawTimer;

var getContext = function(canvas) {
  canvas.width = cw;
  canvas.height = ch;
  var ctx = canvas.getContext('2d');
  ctx.translate(cw, 0);
  ctx.scale(-1, 1);
  ctx.imageSmoothingEnabled = true;

  return ctx;
};

var drawFrame = function() {
  ctxBefore.drawImage(video, 0, 0, cw, ch);
  ctxBefore.beginPath();
  ctxBefore.ellipse(cw * 0.5, ch * 0.5, cw * 0.16, ch * 0.3, 0, 0, 2 * Math.PI);
  ctxBefore.stroke();

  ctxAfter.drawImage(video, 0, 0, cw, ch);
  origamiRenderer.drawFrame(ctxAfter, cw, ch);

  drawTimer = setTimeout(drawFrame, 5);
};

var draw = function() {
  clearTimeout(drawTimer);

  cw = canvasAfter.clientWidth;
  ch = canvasAfter.clientHeight;

  ctxBefore = getContext(canvasBefore);
  ctxAfter = getContext(canvasAfter);

  drawFrame();
};

module.exports = {
  draw: draw,
  getImage: function() {
    return canvasAfter.toDataURL.call(canvasAfter, 'image/png');
  }
};
