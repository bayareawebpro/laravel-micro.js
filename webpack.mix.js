const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.setPublicPath('demo')
mix.babelConfig({
    'plugins': [
        'syntax-dynamic-import',
        'transform-object-rest-spread'
    ]
})
mix.options({
    uglify: {
        uglifyOptions: {
            mangle: {
                keep_fnames: true,
                reserved: ['App','Config', 'Kernel', 'Request', 'Vue', 'Events', 'VueRoot', 'MyService']
            },
            compress: {
                drop_console: false,
            },
            options: {
                nameCache: '.tmp/grunt-uglify-cache.json',
            }
        }
    }
})
mix.webpackConfig({
    resolve: {
        alias: {
            'laralite': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'demo-src/js/Components'),
            '@pages': path.resolve(__dirname, 'demo-src/js/Pages'),
        }
    },
    output: {
        chunkFilename: mix.inProduction() ? 'components/[name].[chunkhash].js' : 'components/[name].js',
    }
})
mix.extract([
    'vue',
    'vue-router'
])
mix.js('demo-src/js/bootstrap.js', 'demo/app.js')
   .sass('demo-src/sass/app.scss', 'demo/app.css');

if(!mix.inProduction()){
}
mix.sourceMaps()
