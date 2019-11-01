## Install
```shell
npm i laravel-micro.js
```
```javascript
import LaravelMicro  from 'laravel-micro.js'
const app = new LaravelMicro;
```
---
## Webpack
Class Constructor names are parsed and read by the container for the dependency injection & 
service provider functionality. You'll need to configure Webpack / Laravel Mix to avoid 
mangling function names and add the aliases of the injections to the reserved words 
list. You can develop without specifying these options but once you compile for 
production you'll need to add them.

> An easy way to deal with this is by logging the registered bindings using the `app.bindings`
computed property

### ES6 Babel Compile
Enable ES6 Babel Compile for LaravelMicro.js Sourcecode.
```javascript
mix.webpackConfig({
    module: {
        rules: [{
            test: /\.js?$/,
            include: [ path.resolve(__dirname, "node_modules/laravel-micro.js") ],
            use: [{ loader: 'babel-loader', options: mix.config.babel() }]
        }]
    }
})
```


## Uglify & Terser
If you use uglify or terser you'll also need to prevent mangling function names and arguments.

#### Laravel Mix 2.x / Uglify
```javascript
mix.options({
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
})
```

#### Laravel Mix 4.x / Terser
```javascript
mix.options({
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