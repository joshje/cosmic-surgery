var qs = require('qs');

var config = window.csConfig || {};
config.query = qs.parse(window.location.search.replace('?', ''));
console.log(config.query);

module.exports = config;
