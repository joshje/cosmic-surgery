var pgp = require("pg-promise")();

var cn;
if (process.env.DATABASE_URL_COSMIC) {
	cn = process.env.DATABASE_URL_COSMIC + '?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory';
} else {
	cn = 'postgres://localhost:5432/cosmicsurgery';
}
var db = pgp(cn);

db.query("CREATE TABLE IF NOT EXISTS surgerycounter (id INTEGER NOT NULL PRIMARY KEY, count INTEGER DEFAULT 0)");
db.query("CREATE TABLE IF NOT EXISTS gallery (id VARCHAR(36) NOT NULL PRIMARY KEY, approved BOOLEAN DEFAULT '0')");

module.exports = function(req, res, next) {
  req.postgres = db;

  next();
};
