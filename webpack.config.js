module.exports = {
     entry: './src/js/index.js',
     output: {
         path: './public/js',
         filename: 'app.bundle.js'
     },
     module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     }
 };
