# Stringable

Stringable is an object-oriented string manipulation service similar to Laravel's Stringable helper.

## Usage
```javascript
import {Stringable} from 'laravel-micro.js'

const str = Stringable.of('this is a string')
```

### Dump
```javascript
str.dump()
```

### toString
```javascript
str.toString()
```

### After
```javascript
str.after('...')
```

### Before
```javascript
str.before('...')
```

### Trim
```javascript
str.trim(' ')
```

### Left Trim
```javascript
str.ltrim('//')
```

### Right Trim
```javascript
str.rtrim('.')
```

### Replace
```javascript
str.replace(' ', '_')
```

### SubString
```javascript
str.substr(0, 3)
```

### Prepend
```javascript
str.prepend('Example: ')
```

### Append
```javascript
str.prepend(' The end.')
```

### Upper
```javascript
str.upper()
```

### Lower
```javascript
str.lower()
```

### Uppercase First
```javascript
str.ucfirst()
```

### TitleCase
```javascript
str.title()
```

### CamelCase
```javascript
str.camel()
```

### SnakeCase
```javascript
str.snake()
```

### KebabCase
```javascript
str.kebab()
```

### Slug
```javascript
str.slug('_')
```

### Explode
```javascript
const words = str.explode(' ')
```

### Condition: Contains
```javascript
str.contains('.')
```

### Condition: Contains All
```javascript
str.containsAll('.', ',', '$')
```

### Condition: Exactly
```javascript
str.exactly('test')
```

### Condition: Is
```javascript
str.is('otherString')
str.is(stringable)
```

### Condition: Is Any
```javascript
str.isAny('otherString', stringable)
```

### Condition: Is Empty
```javascript
str.isEmpty()
```

### Length
```javascript
str.length()
```
