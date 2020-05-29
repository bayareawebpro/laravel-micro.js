# Sharing
Sharing References to Concrete Instances as Callable Methods


The container's sharing API allows you to share references to bindings as 
functions. You can share many references with many objects and revoke access 
to all instances of specific references at any time. This can useful for 
debugging by sharing with the window object or implementing temporary 
access to services as shown in the examples below.

### Methods

```javascript
if(app.canShare('App')){
    app.share('App').withOthers(window)  // window.$app()
}
if(app.isShared('App')){
    app.unShare('App')  // window.$app() = undefined
}
```

### Example

```javascript
app.bind('TempService', () => {
    console.log('ok')
    return 'ok'
})

app.bind('tempInstance', () => {
    const tempInstance = app.make('TempService')
    setTimeout(() => app.destroy('tempInstance'), 10 * 1000)
    console.log('You have 10 seconds to use me!')
    return tempInstance
}, true)

app.share('tempInstance').withOthers(window)

window.tempInstance()
// wait 10 seconds...

window.tempInstance()
// Uncaught ReferenceError: tempInstance is not defined

app.make('tempInstance')
// Container: No Binding found for "tempInstance".

```


```javascript
let MortalA, MortalB = {}

app.bind('Potions', ['brewDragon', 'brewLizard', 'brewOger'])

app.bind('doMagic', (Potions) => (new Wizard(Potions)).brew())

app.bind('playMusic', () => (new MusicBox).play())

app.bind('toMereMortal', () => {
    app.unShare('playMusic')
    app.unShare('doMagic')
    app.unShare('toMereMortal')
})

app.share('doMagic', 'playMusic', 'toMereMortal').with(MortalA, MortalB)

MortalA.doMagic()
MortalB.playMusic() 

MortalA.doMagic()
MortalB.playMusic() 

MortalA.toMereMortal()
MortalB.toMereMortal()

MortalA.doMagic() //undefined
MortalA.playMusic() //undefined
MortalA.toMereMortal() //undefined

MortalB.doMagic() //undefined
MortalB.playMusic() //undefined
MortalB.toMereMortal() //undefined
```