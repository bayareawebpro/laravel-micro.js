
# Middleware & Pipelines

You can create middleware pipelines that can pass an instance of "something" 
(whatever type of object you want it to be) to each subsequent class until it's 
final state can be acted upon. An example of using this functionality with 
VueRouter is provided in the Laravel Preset Package. he Kernel class provided by the 
"AppServiceProvider".

```javascript
import LaravelMicro, {AppServiceProvider}  from 'laravel-micro.js'
import {Authenticate,VerifyRole,StoreSession}  from 'middleware'

const app = new LaravelMicro;
container.register(AppServiceProvider)
container.bootProviders()

const stack = container.make('Kernel')

stack.setMiddleware([
    Authenticate, 
    VerifyRole,
    StoreSession,
])

// Pass through stack via handle method.
const handled = stack.handle(currentUser) 

// Pass through stack via terminate method in reverse order.
const terminated = stack.terminate(handled) 
```

