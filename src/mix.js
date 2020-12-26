const mix = require('laravel-mix');
class MicroMix {
    register(deps) {
        const config = Config || mix.config
        const options = config.terser ? config.terser.terserOptions : config.uglify.uglifyOptions
        options.mangle = (options.mangle || {})
        options.mangle.reserved = (options.mangle.reserved || []).concat(deps)
        options.mangle.keep_fnames = true
    }
    webpackRules() {
        return {
            test: /\.js?$/,
            include: [/node_modules\/laravel-micro.js/],
            use: [{
                loader: 'babel-loader',
                options: (Config || mix.config).babel()
            }]
        }
    }
}
mix.extend('micro', new MicroMix);
