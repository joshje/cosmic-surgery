var config = require('./config');
var origamiTypes = require('./oragami-types');

var cw, ch;

var currentType = 'icosahedron';

var scratchCanvas;
var scratchCtx;

var init = function() {
  if (scratchCanvas) return;

  scratchCanvas = document.createElement('canvas');
  scratchCanvas.width = 720;
  scratchCanvas.height = 720;
  scratchCtx = scratchCanvas.getContext('2d');
  enhanceTypes();
};

var enhanceTypes = function() {
  var enhancePaths = function(type, points, i) {
    var rotation = [90, 340, 120][i%3];
    var image = type.images[i%type.images.length];
    var xPoints = points.map(function(point) { return point[0]; });
    var yPoints = points.map(function(point) { return point[1]; });
    var x = Math.min.apply(Math, xPoints);
    var y = Math.min.apply(Math, yPoints);
    var width = Math.max.apply(Math, xPoints) - x;
    var height = Math.max.apply(Math, yPoints) - y;

    return {
      points: points,
      image: image,
      rotation: rotation,
      x: x,
      y: y,
      width: width,
      height: height
    };
  };

  for (var type in origamiTypes) {
    origamiTypes[type].paths = origamiTypes[type].paths.map(enhancePaths.bind(null, origamiTypes[type]));
  }
};

var drawImage = function(source, ctx, path) {
  scratchCtx.save();

  scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

  var sx = path.image[0] - 100;
  var sy = path.image[1] - 100;
  var sw = 200;
  var sh = 200;

  var dtx = path.x + path.width * 0.5;
  var dty = path.y + path.height * 0.5;

  scratchCtx.translate(dtx, dty);

  if (path.rotation) {
    scratchCtx.rotate(path.rotation * Math.PI / 180);
  }
  if (config.query.debug) {
    scratchCtx.globalAlpha = 0.5;
  }

  scratchCtx.drawImage(source.el, (source.width - cw) / 2 + sx, (source.height - ch) / 2 + sy, sw, sh, sw * -0.5, sh * -0.5, sw, sh);

  scratchCtx.globalCompositeOperation = 'overlay';
  scratchCtx.globalAlpha = 0.5;
  scratchCtx.fillStyle = '#fff';
  scratchCtx.fillRect(sw * -0.5, sh * -0.5, sw, sh);
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

  if (config.query.debug) {
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
  var path;

  if (config.query.debug) {
    for (var j = 0; j < type.images.length; j++) {
      var image = type.images[j];
      ctx.strokeRect(720 - image[0] - 100, image[1] - 100, 200, 200);
    }
  }

  for (var i = 0; i < type.paths.length; i++) {
    path = type.paths[i];
    drawImage(source, ctx, path);
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
