# Installation

```shell
npm i laravel-micro.js
```


## Application Structure

Typical Application directory structures might look something like this:

```
- app
  - bootstrap.js
  - application.js
  - Controllers
    - AccountController
  - Middleware
    - RedirectIfAuthenticated
    - VerifyMatchedRoute
    - Authenticate
  - Services
    - Http
      - HttpServiceProvider
      - HttpService
      - EchoService
    - Router
      - RouterServiceProvider
      - Response
      - Request
      - Routes
    - Store
      - StoreServiceProvider
      - StorePlugin
      - Modules
        - AbstractStore
        - AccountStore
    - Vue
      - VueServiceProvider
      - VueRoot
- Components
- Utilities
- Layouts
- Pages
```

## Application.js Example 
```javascript
import LaravelMicro from 'laravel-micro.js'
export default class Application extends LaravelMicro{
   constructor(){
       super()
   }
   // Your Custom Methods...
}
```

## Bootstrap.js Example 
```javascript
import Application from "./app/application"
import {AppServiceProvider, ErrorHandler} from "laravel-micro.js"
import VueServiceProvider from "./app/Services/Vue/VueServiceProvider"
import HttpServiceProvider from "./app/Services/Http/HttpServiceProvider"
import EchoServiceProvider from "./app/Services/Echo/EchoServiceProvider"
import StoreServiceProvider from "./app/Services/Store/StoreServiceProvider"

const app = new Application
app.errorHandler(ErrorHandler)
app.register(AppServiceProvider)
app.register(StoreServiceProvider)
app.register(EchoServiceProvider)
app.register(HttpServiceProvider)
app.register(VueServiceProvider)
app.bootProviders()
app.make('VueRoot').$mount('#app')
```

### Reserved Words & Production Code Mangling

Class Constructor names are parsed and read by the container for the dependency injection & 
service provider functionality. You'll need to configure Webpack / Laravel Mix to avoid 
mangling function names and add the aliases of the injections to the reserved words 
list. 

```javascript
console.log(app.reservedWords)
```

### Laravel Mix
The micro mix plugin will detect if your using Terser (Mix 4.x) or Uglify (Mix 2.x) and 
merge it's configuration without overwriting any prior configuration.

```javascript
const mix = require('laravel-mix');
require('laravel-micro.js/src/mix');

mix.js('resources/js/app.js', 'public/js')
mix.extract()
mix.micro([
    'App',
    'Kernel',
    'MyService',
    // Reserved Words / Binding Arguments...
], true) //debug
```

### Manual Configuration

If you need to manually configure Uglify / Terser use the configuration below:

```json
terser: {
    terserOptions: {
        mangle: {
            keep_fnames: true,
            reserved: [
                'App',
                'Kernel',
            ]
        },
    }
},
```

```json
uglify: {
    uglifyOptions: {
        mangle: {
            keep_fnames: true,
            reserved: [
                'App',
                'Kernel',
            ]
        },
    }
},
```

