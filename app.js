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
app.set('trust proxy', true);

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.locals.pageTitle = 'Cosmic Surgery';
app.locals.pageDescription = 'Give yourself a cosmic facelift';

app.use(require('./middleware/redirects'));
app.use(require('./middleware/postgres'));

app.use(express.static(__dirname + '/dist'));

app.use('/', require('./routes/cosmicsurgery'));
app.use('/counter', require('./routes/counter'));
app.use('/gallery', require('./routes/gallery'));
app.use('/upload', imageUpload.single('image'), require('./routes/upload-image'));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
