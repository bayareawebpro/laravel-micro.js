# laravel-micro.js
A Laravel inspired IOC Container for javascript applications 
that provides a dependency injection container and familiar
framework design that encourages you to use object oriented 
principals in your frontend application.

`LaravelMicro.js (~28.7 kB)`

[![Generic badge](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Generic badge](https://img.shields.io/badge/License-MIT-orange.svg)]()
[![Generic badge](https://img.shields.io/badge/Version-1.0.0-blue.svg)]()

[View the Wiki for Examples and Documentation...](https://github.com/bayareawebpro/laravel-micro.js/wiki)


### Alpha Release Installation

`npm install git://github.com/bayareawebpro/laravel-micro.js`

https://bayareawebpro.github.io/laravel-micro.js/#/

### Issues
• Uglify - Class Constructor names are parsed and read by the container for 
the dependency injection & service provider functionality.  You'll need to 
configure Webpack / Laravel mix to avoid mangling function names and 
add the aliases of the injections to the reserved words list.

If your interesting in contributing to this repo, please send a push release.
The test suite is fairly simple and requires Jest to run.

```
// Laravel Micro Mix Config
mix.options({
	processCssUrls: false,
	uglify: {
		uglifyOptions: {
			mangle: {
				keep_fnames: true,
				reserved: [
				    'App',
				    'MyService',
				]
			},
		}
	},
})

//Enable ES6 Babel Compile for Laravel Micro
mix.webpackConfig({
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
	}
})

```