class MicroMix {
    register(val) {
        console.log('mix.micro!');
    }
    dependencies() {}
    webpackRules() {
        return {
            test: /\.js?$/,
            include: [ path.resolve(__dirname, "node_modules/laravel-micro.js") ],
            use: [{ loader: 'babel-loader', options: mix.config.babel() }]
        }
    }
    webpackPlugins() {}
}
mix.extend('micro', new MicroMix);