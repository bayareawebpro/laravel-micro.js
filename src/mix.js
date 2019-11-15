const mix = require('laravel-mix');
class MicroMix {
    register(val) {
        console.info('LaravelMicro Mixing...')
    }
    webpackRules() {
        return {
            test: /\.js?$/,
            include: [/node_modules\/laravel-micro.js/],
            use: [{ loader: 'babel-loader', options: mix.config.babel() }]
        }
    }
}
mix.extend('micro', new MicroMix);