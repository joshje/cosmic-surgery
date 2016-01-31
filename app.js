var express = require('express');
var exphbs  = require('express-handlebars');
var multer = require('multer');
var storage = multer.memoryStorage();
var imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 100000000,
    files: 1,
    fields: 2
  }
});

var app = express();

app.set('port', (process.env.PORT || 3000));
app.set('environment', (process.env.NODE_ENV || 'development'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(function(req, res, next) {
  if (app.get('environment') !== 'development' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }

  return next();
});

app.use(express.static(__dirname + '/dist'));

app.get('/', require('./routes/cosmicsurgery'));

app.post('/upload', imageUpload.single('image'), require('./routes/upload-image'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
