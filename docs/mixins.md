# Mixins

To make code as reusable as possible, a mixin is provided that allows you to create class traits.

## Define a Mixin:
```javascript
import {Mixin} from 'laravel-micro.js'
export default (instance) => Mixin(instance, {
    myMethod(){
        //
    }
})
```

## Usage

```javascript
import ImplementsMyMethod from "../Mixins/ImplementsMyMethod"
export default class MyClass{
    //
}
/** MyClass Traits **/
ImplementsMyMethod(MyClass)
```