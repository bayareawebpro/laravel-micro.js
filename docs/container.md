# Container

The container has useful methods for interacting with services and bindings.

```javascript
import LaravelMicro  from 'laravel-micro.js'
const app = new LaravelMicro;
```

## Bind
Bind instances to the container as singletons (shared) or factories (unique).

### Singleton

```javascript
app.bind('MyService', MyService, true)
app.singleton('MyService', MyService)
```

### Factory

```javascript
app.bind('UserFactory', UserFactory, false)
app.factory('UserFactory', UserFactory)
```

```javascript
app.bind('MyClass', MyClass)
app.bind('object', {prop: true})
app.bind('array', ['test'])
app.bind('boolean', true)
app.bind('number', 100)
```

### UnBind 
```javascript
app.unBind('MyClass')
```

### Make 
Build or Resolve an instance from the container.
```javascript
app.make('MyService')
```

### Build 
Build an unbound class resolving it's dependencies.
```javascript
import MyService from './MyService'
const instance = app.build(MyService)
```

### Destroy 
Destroy a resolved instance.

```javascript
app.destroy('MyService')
```

### isResolved 
Determines if a service abstract has an shared concrete instance that's already resolved.

```javascript
if(app.isResolved('DatabaseService')){
    app.destroy('DatabaseService')
}
```

### Rebound 
Destroy and re-build a service abstract that has a shared concrete instance 
that's already resolved.

```javascript
app.rebound('DatabaseService')
```

### setInstance 
Set an concrete instance of a binding.
```javascript
app.setInstance('AuthToken', { token: XXX})
```

### getInstance 
Get a concrete instance of a binding.
```javascript
const token = app.getInstance('AuthToken')
```

### getName 
Returns a string of the Object "name" property or "constructor name" (class name).
```javascript
const name = app.getName(Thing)
```

### isCallable
Is the object callable?
```javascript
if(app.isCallable(callback)){
    callback()
}
```

### isClass

Is the object a class?
```javascript
if(app.isClass(instance)){
    new instance()
}
```

### getSharedAliasName

Get the shared alias name.

```javascript
app.getSharedAliasName('App') // $app
```

### Public Properties 

These properties allow you to list the current state of the application.

```javascript
app.providers
app.bindings
app.resolved
app.sharable
app.sharedWith
app.reservedWords
```


