// Express Related Library
var express = require('express'),
    bodyParser = require('body-parser');

// App middleware setting
//
var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/assets',
        express.static(__dirname + '/assets'));

//app setting

app.engine  ('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

// Register Route and Bundle.js

var apiController = require('./controllers/api');
app.use('/api', apiController);

app.get('/', function(req, res){
    res.render("index");
});

// Start application
var port = process.env.PORT || 8080;
app.listen(port);

console.log('Magic happens on port ' + port);
