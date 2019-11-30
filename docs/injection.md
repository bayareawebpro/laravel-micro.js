# Dependency Injection
Dependency Injection works by parsing the arguments of a callable binding. If the 
binding is determined to be a class it will be constructed using the new keyword. Once 
the arguments are parsed the container will then instantiate each of the dependencies 
required to resolve the binding. If a circular dependency or bad binding is found an 
exception will be thrown.  Hint the aliases of the required services which will be passed into 
the constructor. 

> Keep in mind pre-compiled code will most likely have mangled parameter names so be mindful of what your trying to instantiate. (See installation details)


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
```

```javascript
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

## Reactive Caveats

The container's storage properties are set to non-configurable which prevents reactive 
watchers from polluting the container. This means things will not update everywhere unless 
what you bind is already reactive.

```javascript
import Vue from 'vue'
import User from './User'

app.bind('User', User)
app.bind('Vue', () => Vue)
app.bind('reactiveUser', (Vue, User) => {
  return Vue.observable(new User)
})

const user = app.make('reactiveUser')
```


### Mixed Arguments
There is currently no way to mix dependencies with other required arguments. To 
get around this, use a callback to return a constructed service. Or, bind the required parameter 
before the service is called with make. 

```javascript
app.bind('config', {...})
app.bind('service', (depA, depB, config)=>{
    return new Service(depA, depB, config)
})
```
```javascript
app.bind('service', (depA, depB)=>{
    return new Service(depA, depB, {...})
})
```
