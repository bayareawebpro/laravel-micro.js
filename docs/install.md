## Install
```shell
npm i laravel-micro.js
```
```javascript
import LaravelMicro  from 'laravel-micro.js'
import {AppServiceProvider} from "laravel-micro.js"
import VueServiceProvider from "./Services/Vue/VueServiceProvider"

const app = new LaravelMicro;
app.register(AppServiceProvider)
app.register(VueServiceProvider)
app.bootProviders()
app.debug(false)

app.make('VueRoot').$mount("#app")
```

---
### Laravel Mix
Enable LaravelMicro.js for Laravel Mix.  The micro mix plugin will detect 
if your using Terser (Mix 4.x) or Uglify (Mix 2.x) and merge it's configuration without 
overwriting any prior configuration.

Class Constructor names are parsed and read by the container for the dependency injection & 
service provider functionality. You'll need to configure Webpack / Laravel Mix to avoid 
mangling function names and add the aliases of the injections to the reserved words 
list. You can develop without specifying these options but once you compile for 
production you'll need to add them.

```javascript
console.log(app.reservedWords)
```

```javascript
const mix = require('laravel-mix');
require('laravel-micro.js/src/mix');

mix.js('resources/js/app.js', 'public/js')
mix.extract()
mix.micro([
    'App',
    'Kernel',
    'MyService',
    // Reserved Words / Constructor Argument Names...
])
```