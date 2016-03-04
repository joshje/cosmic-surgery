var pgp = require("pg-promise")();

var db = pgp(process.env.DATABASE_URL_COSMIC + '?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory');

db.query('CREATE TABLE IF NOT EXISTS `surgerycounter` (`id` INTEGER NOT NULL, `count` INTEGER DEFAULT 0, PRIMARY KEY (`id`))');
db.query('CREATE TABLE IF NOT EXISTS `gallery` (`id` VARCHAR(36) NOT NULL, `approved` BOOLEAN DEFAULT 1, PRIMARY KEY (`id`))');

module.exports = function(req, res, next) {
  req.postgres = db;

  next();
};
