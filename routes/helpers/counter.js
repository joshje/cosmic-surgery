module.exports = {
  get: function(req) {
    return req.postgres.one('SELECT count FROM surgeryCounter WHERE id=1');
  },
  increment: function(req) {
    return req.postgres.query('INSERT INTO surgeryCounter (id, count) VALUES (1, 1) ON DUPLICATE KEY UPDATE count = count + 1');
  }
};
