const mix = require('laravel-mix');
const WebpackRequireFrom = require('webpack-require-from')
const plugins = [
	new WebpackRequireFrom({
		 variableName: "chunkURL"
	})
]
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
mix.setPublicPath('build')
mix.babelConfig({
	'plugins': [
		'syntax-dynamic-import',
		'transform-object-rest-spread'
	]
})
mix.options({
	processCssUrls: false,
	uglify: {
		sourceMap: true,
		uglifyOptions: {
			mangle: {
				keep_fnames: true,
				reserved: [
					'App',
					'Kernel',
					'Config',
					'Request',

					'ServiceV1',
					'ServiceV2',
					'Service_V1',
					'Service_V2',

					'Authenticate',
					'RandomLoadingText',
					'artisanMessage',

					'Vue',
					'Events',
					'EventBus',
					'VueRoot',
					'Router',
					'VueRouter',
					'routerLinks',
					'LazyService',
				]
			},
		}
	}
})
mix.webpackConfig({
	plugins: plugins,
	module: {
		rules: [{
			test: /\.js?$/,
			include: [
				path.resolve(__dirname, "node_modules/laravel-micro.js"),
			],
			use: [{
				loader: 'babel-loader',
				options: mix.config.babel()
			}]
		}]
	},
	resolve: {
		alias: {
			'@components': path.resolve(__dirname, 'src/js/Components'),
			'@pages': path.resolve(__dirname, 'src/js/Pages'),
		}
	},
	output: {
		chunkFilename: 'components/[name].js'
	}
})
mix.extract([
	'vue',
	'vue-router'
])
mix
	.js('src/js/bootstrap.js', 'app.js')
	.sass('src/sass/app.scss', 'app.css')

if (!mix.inProduction()) {
	mix.sourceMaps()
}
