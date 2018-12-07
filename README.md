# laravel-micro.js
A Laravel inspired IOC Container for javascript applications 
that provides a dependency injection container and familiar
framework design that encourages you to use object oriented 
principals in your frontend application.

`Container.js (8.15 kB)`

[![Generic badge](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Generic badge](https://img.shields.io/badge/License-MIT-orange.svg)]()
[![Generic badge](https://img.shields.io/badge/Version-1.0.0-blue.svg)]()

[View the Wiki for Examples and Documentation...](https://github.com/bayareawebpro/laravel-micro.js/wiki)


## Installation

`npm install git://github.com/bayareawebpro/laravel-micro.js`

https://bayareawebpro.github.io/laravel-micro.js/#/

## Issues
• Uglify - Class Constructor names are parsed and read by the container for 
the dependency injection & service provider functionality.  You'll need to 
configure Webpack / Laravel mix to avoid mangling function names and 
add the aliases of the injections to the reserved words list.

If your interesting in contributing to this repo, please send a push release.
The test suite is fairly simple and requires Jest to run.

```
mix.options({
	uglify: {
		uglifyOptions: {
			mangle: {
			    // Keep Constructor Names:
			    // Required for service providers.
				keep_fnames: true,
				
			    // Decare the aliases to be injected as reserved words.
			    // Required for dependancy injection:
				reserved: [
					'App',
					'Kernel',
					'Config',
					'Request',

					'ServiceV1',
					'ServiceV2',

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
```