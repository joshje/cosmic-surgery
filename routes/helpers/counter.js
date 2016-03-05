module.exports = {
  get: function(req) {
    return req.postgres.one('SELECT count FROM surgeryCounter WHERE id=1');
  },
  increment: function(req) {
  	console.log('increment');
    return req.postgres.query('INSERT INTO surgeryCounter AS sc (id, count) VALUES (1, 1) ON CONFLICT (id) DO UPDATE SET count = sc.count + 1 WHERE sc.id = 1')
    .catch(function(err) {
    	console.log('err', err);
    });
  }
};
