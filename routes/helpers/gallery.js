var _ = require('lodash');

module.exports = {
  add: function(req, id) {
  	if (! id) return;
    return req.postgres.query("INSERT INTO gallery (id) VALUES ('" + id + "')");
  },
  permit: function(req, id) {
  	if (! id) return;
    return req.postgres.query("UPDATE gallery SET approved = '1' WHERE id='" + id + "'");
  },
  get: function(req) {
  	return req.postgres.many("SELECT id FROM gallery WHERE approved = '1'")
  	.then(function(results) {
  		return _.map(results, function(result) {
  		  var url = 'http://d2csffd0gyvkmk.cloudfront.net/images/' + result.id + '.jpg';
  		  return {
  		    url: url
  		  };
  		})
  		return result;
  	})
  	.catch(function() {
  		return [];
  	});
  }
};
