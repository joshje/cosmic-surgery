module.exports = {
  add: function(req, id) {
    return req.postgres.query('INSERT INTO `gallery` (`id`) VALUES ("' + id + '")');
  },
  permit: function(req, id) {
    return req.postgres.query('UPDATE `gallery` SET `approved` = 1 WHERE id="' + id + '"');
  }
};
