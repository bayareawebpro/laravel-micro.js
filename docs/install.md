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

> An easy way to deal with this is by logging the registered bindings using the `app.reservedWords` computed property

```javascript
console.log(app.reservedWords)
```

### ES6 Babel Compile
Enable LaravelMicro.js with Laravel Mix.

#### webpack.mix.js
```javascript
const mix = require('laravel-mix');
require('laravel-micro.js/src/mix');

mix.js('resources/js/app.js', 'public/js')
mix.extract()
mix.micro([
    'App',
    'Kernel',
    'MyService',
])
```

