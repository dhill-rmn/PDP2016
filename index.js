var path = require('path'),
	express = require('express'),
	app = express(),
	morgan = require('morgan'),
	favicon = require('serve-favicon');

app.use(express.static(path.resolve('public')));
app.use(morgan('combined'));
// app.use(favicon(__dirname + '/public/favicon.ico'));

app.set('views', path.resolve('public' + '/html'));

app.get('/', function (req, res) {
	res.sendfile(path.resolve('public' + '/html' + '/index.html'));
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
