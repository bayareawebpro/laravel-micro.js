
# Validator

```javascript
import {Validator} from 'laravel-micro.js'

const validator = new Validator

axios.get('/my-route').then((response)=>{
    console.log(response)
})
.catch((error)=>{
    validator.sync(error.response)
})
```

### All
```javascript
const objVal = validator.all()
```

### Clear
```javascript
validator.clear()
```

### Has
```javascript
const boolVal = validator.has('myField')
```

### Get
```javascript
const arrayVal = validator.get('myField', ['This is a fallback.'])
```

### First
```javascript
const stringVal = validator.first('myField', 'This is a fallback.')
```

### Has
```javascript
const boolVal = validator.has('email')
```

### hasAny
```javascript
const boolVal = validator.hasAny(['email', 'password'])
```

### Put
```javascript
validator.put('email', 'Email is invalid.')
```

### Forget
```javascript
validator.forget('myField')
```


### setMessage
```javascript
validator.setMessage('Invalid Request.')
```

### clearMessage
```javascript
validator.clearMessage()
```

### setErrors
```javascript
validator.setErrors({
  myField: ["Min length 5 chars."]
})
```


### Make (new instance)
```javascript
const altInstance = validator.make({
    message: null,
    messageBag: {
        field:[ 
            "error"
        ]
    }
})
```


### Computed Properties
```javascript
validator.isInvalid
validator.firstEntry
```

### Public Properties
```javascript
validator.message
validator.exception
```

