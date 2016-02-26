var qs = require('qs');

var config = window.csConfig || {};
config.query = qs.parse(window.location.search.replace('?', ''));

module.exports = config;
