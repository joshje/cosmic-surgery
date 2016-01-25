var getUserMedia;

if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  getUserMedia = function(constraints, onSuccess, onError) {
    navigator.mediaDevices.getUserMedia.call(navigator, constraints)
    .then(onSuccess)
    .catch(onError);
  };
} else {
  getUserMedia = (
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia
  ).bind(navigator);
}

module.exports.getUserMedia = getUserMedia;
