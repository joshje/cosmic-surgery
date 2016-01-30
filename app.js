var express = require('express');
var exphbs  = require('express-handlebars');

var app = express();
app.set('port', (process.env.PORT || 3000));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/dist'));

app.get('/', function(request, response) {
  response.render('cosmic-surgery');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
