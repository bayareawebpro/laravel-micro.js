# Error Handling

```javascript
const App = new Application
app.errorHandler(MyErrorHandlerClass)
```

You can set the container error handler to a class or callback, (disabled by default).

## Error Handler

The included error handler class is designed to interact with 'Exceptions" which can have a "handle" method. When 
the error is thrown it will get caught by the error handler.

```javascript
export default class Handler{
    /**
     * Exception Handler Class
     * @param App {Container}
     */
    constructor(App) {
        this.app = App
    }
    /**
     * Handle Method
     * @param Error {Error|Exception}
     */
    handle(error){
        if(typeof error.handle === 'function'){
            try{
                return error.handle(this.app)
            }catch (e) {
                console.error(`Failed to handle "${error.name}"...`, error)
            }
        }
        console.info(`"${error.name}" Encountered...`, error)
    }
}
```


## Exception extends Error

The framework includes the ability to use custom errors referred to as "Exceptions". Exceptions
can extend the browsers built-in Error interface. In the example included Exceptions
can have a "handle" method that is passed the application instance. This allows 
Errors to "recover" by reacting to the application state.

```javascript
export default class Exception extends Error{
    /**
     * Generic Exception Class
     * @param args {*}
     */
    constructor(...args) {
        super(...args)
        /**
         * Arguments passed to the exception.
         * @property args {Array}
         */
        this.args = args

        /**
         * The name of the Custom Exception.
         * @property name {String}
         */
        this.name = 'Exception'

        /**
         * Handle from the exception when it's thrown.
         * @param App {Application}
         * @return {*}
         */
        this.handle = (App) => {
        	//react to the exception when it's caught by the error handler.
        }
    }
}

```


## Self-Handling Exceptions

If an exception is encountered that has a "handle" method, the method will be called 
and the exception can react to itself and provide a new instance from the container 
which will be resolved for the called binding.

In the example below:

- An exception is thrown as the container attempts to make "badBinding"
- The exception is handled and it's handle method is called.
- The handle method dictates the app should return an instance of "backupObject" in it's place.
- Every subsequnt call to "app.make('badBinding')" will return the shared instance of "backupObject".


```javascript
class Handler {
    handle(Error){
        return Error.handle ? Error.handle(this.app) : null
    }
}
class MyException extends Exception{
    constructor(...args) {
        super(...args)
        this.handle = (App) => {
            console.log('Providing "backupObject"')
            return app.make('backupObject')
        }
    }
}
app.errorHandler(Handler)

app.bind('badBinding', () => {
	throw new MyException('HAHA Immediate Fail.')
})
app.bind('backupObject', () => { 
	return { yourGood: true } 
})

const result =  app.make('badBinding')
```


- Container: Sharing Instance of "App".
- Container Binding: "backupObject"...
- Container Binding: "badBinding"...
- Container: Making "badBinding"...
- Container: Resolving Binding for "badBinding"...
- MyException Encountered, Self-Handling by Providing "backupObject"
- Container: Making "backupObject"...
- Container: Resolving Binding for "backupObject"...
- Container: Instantaiated Concrete Instance successfully. {yourGood: true}
- Container: "backupObject" is Sharable.
- Container: Sharing Instance of "backupObject".
- Container: "badBinding" is Sharable.
- Container: Sharing Instance of "badBinding".
- Result: {yourGood: true}