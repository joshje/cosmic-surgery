module.exports = {
  get: function(req) {
    return req.postgres.one('SELECT count FROM surgeryCounter WHERE id=1');
  },
  increment: function(req) {
    return req.postgres.query('UPDATE surgeryCounter SET count = count + 1 WHERE id=1');
  }
};
