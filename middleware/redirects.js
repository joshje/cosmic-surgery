module.exports = function(req, res, next) {
  var host = req.get('Host');

  if (host.match(/^www./i)) {
    return res.redirect(['https://', host.replace('www.', ''), req.url].join(''));
  } else if (req.protocol !== 'https') {
    return res.redirect(['https://', host, req.url].join(''));
  }

  return next();
};
