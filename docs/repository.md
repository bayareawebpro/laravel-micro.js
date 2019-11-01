# Repository
```javascript
import {Repository} from 'laravel-micro.js'
const repo = new Repository
```

### All
```javascript
repo.all()
```

### Sync
```javascript
repo.sync({...})
```


### Update
```javascript
repo.update({
    'form.name': 'John',
    'form.email': 'john@doe.person',
    'form.message': null,
})
```

### Merge
```javascript
repo.merge('form.location', {
    lat: 1285.0001,
    lon: -1285.0001
})
```

### MergeWhere

```javascript
const repo = new Repository({
    items:[
        {id: 1, label: 1},
        {id: 2, label: 2},
        {id: 3, label: 3},
        {id: 4, label: 4},
    ],
})
repo.mergeWhere('items', 'id', {id: 3, label: 'updated'})
```

### FirstWhere
```javascript
repo.firstWhere('items', 'id', 3)
```

### Exists (value)
```javascript
repo.exists('form.id')
```

### Has (attribute)
```javascript
repo.has('my.nested.key')
repo.has('invoice.items.0')
```

### HasValue
```javascript
repo.hasValue('user.role', 'admin')
repo.hasValue('invoice.items.0.status','paid')
```

### HasEntries
```javascript
repo.hasEntries('post.categories') // Array
repo.hasEntries('form') // Object
```

### Get
```javascript
repo.get('user.name', 'John Doe')
repo.get('invoice.items.0')
```

### Put / Set
```javascript
repo.put('user', { email:'', password:'' })
repo.set('user.email', 'Bob')
repo.set('invoice.items.0.status','paid')
```

### Pull
```javascript
let val
val = repo.pull('status', 'fallback')
val = repo.pull('nested.items.0.label')
```

### Prepend
```javascript
repo.prepend('books',{name: 'First Book'})
```

### Append
```javascript
repo.append('user.roles','admin')
```

### Reject (literal)
```javascript
repo.reject('cart.items',item)
```

### RejectWhere (attribute)
```javascript
repo.rejectWhere('resource.items','id', 1)
```

### Forget
```javascript
repo.forget('form') // Object
repo.forget('nested.items.0') // Array
```

### Make (new instance)
```javascript
const altInstance = repo.make({...})
```

### Computed (getters/setters)
```javascript
repo.computed
```
