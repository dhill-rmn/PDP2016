var path = require('path'),
	express = require('express'),
	app = express(),
	morgan = require('morgan'),
	favicon = require('serve-favicon'),
	webpackDevMiddleware = require('webpack-dev-middleware'),
	webpack = require('webpack'),
	publicDir = path.resolve(__dirname + '/../public');

// var compiler = webpack({
//      output: {
//          path: './public/js'
//      }
//  });
console.log(path.resolve(__dirname + '/../src/js/index.js'));
app.use(webpackDevMiddleware(webpack({
    // webpack options
    // webpackMiddleware takes a Compiler object as first parameter
    // which is returned by webpack(...) without callback.
    entry: './src/js/index.js',
    output: {
        path: "public/js",
        filename: 'app.bundle.js'
        // no real path is required, just pass "/"
        // but it will work with other paths too.
    }
}), {
    // publicPath is required, whereas all other options are optional

    noInfo: false,
    // display no info to console (only warnings and errors)

    quiet: false,
    // display nothing to the console

    lazy: true,
    // switch into lazy mode
    // that means no watching, but recompilation on every request

    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    // watch options (only lazy: false)

    publicPath: "/public/",
    // public path to bind the middleware to
    // use the same as in webpack

    headers: { "X-Custom-Header": "yes" },
    // custom headers

    stats: {
        colors: true
    }
    // options for formating the statistics
}));

app.use(express.static(publicDir));
app.use(morgan('combined'));
app.use(favicon(path.resolve(__dirname + '/../favicon.ico')));

app.set('views', path.resolve(publicDir + '/html'));

app.get('/', function (req, res) {
	res.sendFile(path.resolve(publicDir + '/html/index.html'));
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
