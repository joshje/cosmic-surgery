var origamiTypes = require('./oragami-types');

var cw, ch;

var currentType = 'icosahedron';

var scratchCanvas = document.createElement('canvas');
var scratchCtx;

var init = function(source) {
  scratchCanvas.width = source.width;
  scratchCanvas.height = source.height;
  scratchCtx = scratchCanvas.getContext('2d');
};

var drawImage = function(source, ctx, image, path) {
  scratchCtx.save();

  scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

  var sx = image[0];
  var sy = image[1];
  var sw = image[2];
  var sh = image[3];
  var dw = path.destination[2];
  var dh = path.destination[3];
  var dtx = path.destination[0] + dw * 0.5;
  var dty = path.destination[1] + dh * 0.5;

  scratchCtx.translate(dtx, dty);

  if (path.rotation) {
    scratchCtx.rotate(path.rotation * Math.PI / 180);
  }
  if (window.debug) {
    scratchCtx.globalAlpha = 0.5;
  }

  scratchCtx.drawImage(source.el, sx, sy, sw, sh, dw * -0.5, dh * -0.5, dw, dh);

  scratchCtx.restore();
  scratchCtx.save();

  scratchCtx.fillStyle = '#fff';
  if (! window.debug) {
    scratchCtx.globalCompositeOperation = 'destination-in';
  }
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

  ctx.drawImage(scratchCanvas, (scratchCanvas.width - cw) / 2, (scratchCanvas.height - ch) / 2, cw, ch, 0, 0, cw, ch);

  scratchCtx.restore();
};

var renderFrame = function(source, ctx, width, height) {
  cw = width;
  ch = height;
  var type = origamiTypes[currentType];

  if (window.debug) {
    for (var j = 0; j < type.images.length; j++) {
      var image = type.images[j];
      ctx.strokeRect(640 - image[0] - image[2], image[1], image[2], image[3]);
    }
  }

  for (var i = 0; i < type.paths.length; i++) {
    var path = type.paths[i];
    drawImage(source, ctx, type.images[path.image], path);
  }
};

var changeType = function(type) {
  currentType = type;
};

module.exports = {
  init: init,
  renderFrame: renderFrame,
  changeType: changeType
};
