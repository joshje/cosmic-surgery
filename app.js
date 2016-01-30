var express = require('express');
var exphbs  = require('express-handlebars');

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

app.get('/', function(request, response) {
  response.render('cosmic-surgery');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
