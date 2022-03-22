 
const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
.sass('resources/sass/app.scss', 'public/css')
.ts('resources/ts/app.ts', 'public/ts')
.js('resources/js/app.js', 'public/js')
    
    .dumpWebpackConfig({
        module: {
            rules:[
                {
                    test: /\.ts?$/,
                    loader: "ts-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            extensions: ['*', '.js','.ts', '.json'],
      
        }
    })
