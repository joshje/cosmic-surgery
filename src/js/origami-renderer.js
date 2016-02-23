var origamiTypes = require('./oragami-types');

var cw, ch;

var currentType = 'icosahedron';

var scratchCanvas = document.createElement('canvas');
var scratchCtx;

var init = function() {
  scratchCanvas.width = 720;
  scratchCanvas.height = 720;
  scratchCtx = scratchCanvas.getContext('2d');
};

var drawImage = function(source, ctx, image, path) {
  scratchCtx.save();

  scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

  var pathXs = path.points.map(function(point) { return point[0]; });
  var pathYs = path.points.map(function(point) { return point[1]; });
  var minX = Math.min.apply(Math, pathXs);
  var maxX = Math.max.apply(Math, pathXs);
  var minY = Math.min.apply(Math, pathYs);
  var maxY = Math.max.apply(Math, pathYs);
  var width = maxX - minX;
  var height = maxY - minY;


  var sx = image[0] - 100;
  var sy = image[1] - 100;
  var sw = 200;
  var sh = 200;

  var dtx = minX + width * 0.5;
  var dty = minY + height * 0.5;

  scratchCtx.translate(dtx, dty);

  if (path.rotation) {
    scratchCtx.rotate(path.rotation * Math.PI / 180);
  }
  if (window.debug) {
    scratchCtx.globalAlpha = 0.5;
  }

  scratchCtx.drawImage(source.el, (source.width - cw) / 2 + sx, (source.height - ch) / 2 + sy, sw, sh, sw * -0.5, sh * -0.5, sw, sh);

  scratchCtx.restore();
  scratchCtx.save();

  scratchCtx.fillStyle = '#fff';
  scratchCtx.globalCompositeOperation = 'destination-in';
  scratchCtx.beginPath();

  scratchCtx.moveTo(path.points[0][0], path.points[0][1]);

  for (var i = 1; i < path.points.length; i++) {
    scratchCtx.lineTo(path.points[i][0], path.points[i][1]);
  }

  scratchCtx.closePath();

  if (window.debug) {
    scratchCtx.stroke();
  } else {
    scratchCtx.fill();
  }

  ctx.drawImage(scratchCanvas, 0, 0, cw, ch);

  scratchCtx.restore();
};

var renderFrame = function(source, ctx, width, height) {
  cw = width;
  ch = height;
  var type = origamiTypes[currentType];

  if (window.debug) {
    for (var j = 0; j < type.images.length; j++) {
      var image = type.images[j];
      ctx.strokeRect(720 - image[0] - 100, image[1] - 100, 200, 200);
    }
  }

  for (var i = 0; i < type.paths.length; i++) {
    var path = type.paths[i];
    drawImage(source, ctx, type.images[path.image], path);
  }

  var shadowImg = document.querySelector('[data-shadow=' + currentType + ']');
  ctx.drawImage(shadowImg, 0, 0, cw, ch);
};

var changeType = function(type) {
  currentType = type;
};

module.exports = {
  init: init,
  renderFrame: renderFrame,
  changeType: changeType
};
