# Dependency Injection
Dependency Injection works by parsing the arguments of a callable binding. If the 
binding is determined to be a class it will be constructed using the new keyword. Once 
the arguments are parsed the container will then instantiate each of the dependencies 
required to resolve the binding. If a circular dependency or bad binding is found an 
exception will be thrown.

You can simply hint the aliases of the required services which will be passed into 
the constructor.  It's an all or nothing scenario. makeWith is not available. There 
is currently no way to mix dependencies with other required arguments. To get around 
this, use a callback to return a constructed service. Or, bind the required parameter 
before the service is called with make. Keep in mind pre-compiled code will most likely 
have mangled parameter names so be mindful of what your trying to instantiate.

```javascript
/** Specify the aliases of needed dependencies in constructors. */

class ClassA{
    constructor(classB, classC){
        this.classB = classB
        this.classC = classC
    }
}
class ClassB{
    constructor(classC){
        this.classC = classC
    }
}
class ClassC{
    constructor(App){
        this.app = App
    }
}


/** Then, import and bind un-instantiated. */

import {ClassA, ClassB, ClassC} from './MyServices'
import LaravelMicro  from 'laravel-micro.js'
const app = new LaravelMicro;

app.bind('classA',ClassA)
app.bind('classB',ClassB)
app.bind('classB',ClassC)

/** Functions can also specify Dependencies. */
app.bind('combined',(classA, classB, classC) => {
    return {classA, classB, classC}
})

const combined = app.make('combined')
```

## Reactive Caveats:

The container's storage properties are set to non-configurable which prevents reactive 
watchers from polluting the container. This means things will not update everywhere unless 
what you bind is already reactive.

To understand this let's digest a use case: We have "V1" which will be called using the 
"Service" Binding. When "Service" is instantiated it asks for V1 and returns a reactive 
object using the new Vue.observable API. Once instantiated it's resolved in a reactive 
state and everywhere it's used will be updated. V1 may have dependencies, so we first 
resolve those, then resolve the reactive service instance.

```javascript
// NonReactive Constructor
import Vue from 'vue'
import V1 from 'V1'

// Bind Class
app.bind('V1', V1)

// Passed as Constructed and returned as Reactive.
app.bind('Service', (V1) => Vue.observable(V1)) 

// Reactive Instance.
const service = app.make('Service')
```

```javascript
app.bind('Vue', () => Vue)
app.bind('currentUser', (Vue) => {
  return Vue.observable(new User({
    email: 'test@test.com'
  }))
})
```
