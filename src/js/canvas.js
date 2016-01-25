var canvas = document.getElementById('canvas');
var video = document.getElementById('video');
var ctx;
var drawTimer;

var drawFrame = function() {
  ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight, this.xOffset, this.yOffset, video.videoWidth * this.ratio, video.videoHeight * this.ratio);

  drawTimer = setTimeout(drawFrame.bind(this), 5);
};

var draw = function() {
  clearTimeout(drawTimer);
  canvas.width = canvas.clientWidth;
  canvas.height = canvas.clientHeight;
  ctx = canvas.getContext('2d');
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);

  var hRatio = canvas.width  / video.videoWidth;
  var vRatio =  canvas.height / video.videoHeight;
  this.ratio  = Math.max(hRatio, vRatio);
  this.xOffset = ( canvas.width - video.videoWidth * this.ratio ) / 2;
  this.yOffset = ( canvas.height - video.videoHeight * this.ratio ) / 2;

  drawTimer = drawFrame.call(this);
};

module.exports = {
  draw: draw
};
