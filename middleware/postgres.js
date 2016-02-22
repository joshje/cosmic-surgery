var pgp = require("pg-promise")();

var db = pgp(process.env.DATABASE_URL_COSMIC + '?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory');

module.exports = function(req, res, next) {
  req.postgres = db;

  next();
};
