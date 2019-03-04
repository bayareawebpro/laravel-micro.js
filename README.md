Disclaimer: This is a community project and not an official Laravel package.

# laravel-micro.js

An IOC Container written in Javascript so you can backend your frontend Laravel style.

## Features
* True Dependency Injection.
* Service Providers.
* Middleware & Pipelines.
* Error Handling.
* LazyLoad Compatibile.
* Object Oriented.
* Zero Dependancies.

[![Generic badge](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Generic badge](https://img.shields.io/badge/License-MIT-orange.svg)]()
[![Generic badge](https://img.shields.io/badge/Version-1.0.0-blue.svg)]()

[View the Wiki for Examples and Documentation](https://github.com/bayareawebpro/laravel-micro.js/wiki)

[View the Demo App for a Live Preview](https://bayareawebpro.github.io/laravel-micro.js/#/)


### NPM Installation
`npm i laravel-micro.js`

---

#### Laravel Mix Setup - Uglify/Terser
Class Constructor names are parsed and read by the container for the dependency injection & service provider
 functionality.  You'll need to configure Webpack / Laravel Mix to avoid mangling function names and add the aliases 
 of the injections to the reserved words list.  You can develop without specifying these options but once you compile 
 for production you'll need to add them. 

```
//Disable Terser/Uglify for constructors and the specified argument names.
mix.options({
    //Laravel Mix 3.0
    uglify: {
        uglifyOptions: {
            mangle: {
                keep_fnames: true,
                reserved: [
                    'App',
                    'Kernel',
                    'MyService',
                ]
            },
        }
    },
    //Laravel Mix 4.0
    terser: {
        terserOptions: {
            mangle: {
                keep_fnames: true,
                reserved: [
                    'App',
                    'Kernel',
                    'MyService',
                ]
            },
        }
    },
})
```

#### ES6 Class Extends
The codebase comes un-compiled so you can extend classes. Use the babel config below to enable compiling.

```
//Enable ES6 Babel Compile for LaravelMicro.js Sourcecode.
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

### Contribute
If your interesting in contributing to this repo, please do..

Test suite provided by Jest.
