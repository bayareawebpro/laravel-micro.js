# Repository
```javascript
import {Repository} from 'laravel-micro.js'
const repo = new Repository
```

```javascript
import {Repository} from 'laravel-micro.js'
class UserResource extends Repository{
    findById(id){
        return this.firstWhere('collection.items', 'id', id)
    }
    updateRole(id, role){
        return this.mergeWhere('collection.items', 'id', {id, role})
    }
}
```

### Make (new instance)
Make a new instance of self with optional schema.

```javascript
const user = repo.get('form.user')
const userRepo = repo.make(user)
```

### All
Get the root data object schema and all it's child properties.

```javascript
repo.all()
```

### Sync
Set the root data object schema.

```javascript
repo.sync({...})
```

### Update
Loops over each root property and calls `set` for each one, allowing dotSyntax updates.

```javascript
repo.update({
    'form.name': 'John',
    'form.email': 'john@doe.person',
    'form.message': null,
})
```

### MergeWhere
Merge / object assign to an item within an array.

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
Accessor: Find an item within an array.

```javascript
repo.firstWhere('items', 'id', 3)
```

### Has (attribute)
Conditional: Repo has attribute key.

```javascript
repo.has('my.nested.key')
repo.has('invoice.items.0')
```

### Exists (value)
Conditional: Repo attribute value exists.

```javascript
repo.exists('form.id')
```

### HasValue
Conditional: Repo attribute value matches param.

```javascript
repo.hasValue('user.role', 'admin')
repo.hasValue('invoice.items.0.status','paid')
```

### HasEntries
Conditional: Repo attribute array/object has entries.  Supports any object with a `length` property.

```javascript
repo.hasEntries('post.categories') // Array
repo.hasEntries('form') // Object
```

### Put / Set
Mutator: set a nested value on an object or array entry.

```javascript
repo.put('user', { email:'', password:'' })
repo.set('user.email', 'john@doe.net')
repo.set('invoice.items.0.status','paid')
```

### Get
Accessor: get a nested value from an object or array entry.

```javascript
const name = repo.get('user.name', 'John Doe')
const firstItem = repo.get('invoice.items.0.label')
const firstItemTotal = repo.get('invoice.items.0.total')
```

### Increment / Decrement

Increment or Decrement a value specifying fallback starting value for a non-existent property.

```javascript
repo.increment('post.views', 0)
repo.decrement('post.views', 0)
```

### Prepend
Mutator: Prepend an entry to an array attribute.

```javascript
repo.prepend('books',{name: 'First Book'})
```

### Append
Mutator: Append an entry to an array attribute.

```javascript
repo.append('user.roles','admin')
```

### Pull
Mutator: get and remove a nested value on an object or array entry.

```javascript
let val
val = repo.pull('status', 'fallback')
val = repo.pull('nested.items.0', null)
val = repo.pull('nested.items.0.label', 'unlabeled')
```

### Reject (literal)
Mutator: Reject items that are a literal match.

```javascript
repo.reject('cart.items',item)
```

### RejectWhere (attribute)
Mutator: Reject items that have a matching attribute.

```javascript
repo.rejectWhere('resource.items','status', 'paid')
```

### Forget
Mutator: Remove an item or property.

```javascript
repo.forget('form') // Object
repo.forget('nested.items.0') // Array
```

### Merge
Merge / object assign with a property.

```javascript
repo.merge('form.location', {
    lat: 1285.0001,
    lon: -1285.0001
})
```

---


## Store Usage

```vue
<script>
    /** @property entity */
    /** @property loading */
    /** @property $errors */
    /** @method edit */
    /** @method update */
    export default {
        name: "Edit",
        beforeCreate() {
            this.$store.mapActions('Account', {
                update: 'update',
                edit: 'edit',
            })
            this.$store.mapGetters('Account', {
                loading: 'loading',
                entity: 'entity',
            })
            this.$nextTick(()=>this.edit())
        },
    }
</script>
<template>
    <form ref="form" @submit.prevent>
        <v-form-message v-model="$errors.message"/>

        <v-form-control
            type="text"
            v-model="entity.email"
            label="Email Address"
            @change="$errors.forget('email')"
            :invalid="$errors.has('email')"
            :help="$errors.first('email', 'Enter your email.')">
        </v-form-control>

        <v-action 
            :loading="loading" 
            class="btn btn-big"
            @click="update(entity)">
            Save
        </v-action>
    </form>
</template>
```

## Store Class

```javascript
import Vue from "vue"
import {Repository} from "laravel-micro.js"

export default class AccountStore {
    constructor(Http){
        this.$state = Vue.observable(new Repository(this.schema))
        this.$http = Http
    }
    get schema(){
        return {
        	user: null
        }
    }
    
    get isLoggedIn() {
        return this.$state.exists('user.created_at')
    }

    async edit(){
        await this.$http.get('/api/account').then(({data}) => {
            this.$state.set('entity', data.entity)
        })
    }

    async update(form) {
        this.$errors.clear()
        this.$state.set('loading', true)
        return await this.$http
            .put('/api/account', form)
            .then(({data}) => {
                this.$state.set('user', data.entity)
                return data
            })
            .catch(({response}) => {
                this.$errors.sync(response.data)
            })
            .finally(() => {
                this.$state.set('loading', false)
            })
    }
}
```

### Store Service Provider

```javascript
import Vue from 'vue'
import AccountStore from "./Modules/AccountStore"
import StorePlugin from "./StorePlugin"
import {ServiceProvider} from "laravel-micro.js"
export default class StoreServiceProvider extends ServiceProvider {

    /**
     * Register any application services
     * @return void
     */
    register() {
        this.app.bind('Account', AccountStore)
        Vue.use(StorePlugin, {
            resolve: (store)=>this.app.make(store),
        })
    }

    /**
     * Boot any application services
     * @return void
     */
    boot() {
        //
    }

    /**
     * Declare the aliases for the provided services
     * @return {Array}
     */
    get provides() {
        return [
            'Account',
        ]
    }
}
```

### Store Plugin

```javascript
export default {
    install(Vue, options){
        Object.defineProperty(Vue.prototype, '$store', {
            configurable: true,
            get(){
                this.$options.computed = this.$options.computed || {}
                this.$options.methods = this.$options.methods || {}
                return {
                    mapState: (store, props)=>{
                        const instance = options.resolve(store)
                        Object.entries(props).forEach((entry)=>{
                            this.$options.computed[entry[0]] = {
                                cache:true,
                                get(){
                                    return typeof entry[1] === 'function' ? entry[1](instance) : instance[entry[1]]
                                },
                            }
                        })
                        return this
                    },
                    mapActions: (store, actions)=>{
                        const instance = options.resolve(store)
                        Object.entries(actions).forEach((entry)=>{
                            this.$options.methods[entry[0]] = instance[entry[1]].bind(instance)
                        })
                        return this
                    },
                    mapGetters: (store, props)=>{
                        const instance = options.resolve(store)
                        Object.entries(props).forEach((entry)=>{
                            this.$options.computed[entry[0]] = {
                                cache:true,
                                get(){
                                    if(instance[entry[1]]){
                                        return instance[entry[1]]
                                    }
                                    return instance.$state.get(entry[1])
                                },
                                set(val){
                                    if(instance[entry[1]]){
                                        return instance[entry[1]] = val
                                    }
                                    return instance.$state.set(entry[1], val)
                                }
                            }
                        })
                        return this
                    }
                }
            }
        })
    }
}
```