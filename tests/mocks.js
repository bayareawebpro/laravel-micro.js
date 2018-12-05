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
    constructor(){
    }
}

const PipeState = { state: 0 }
class PipeA{
    constructor(App){}
    handle(thing, next){
        thing.state++
        return next(thing)
    }
}
class PipeB{
    constructor(App){}
    handle(thing, next){
        thing.state = (thing.state + 1)
        return next(thing)
    }
}
class PipeC{
    constructor(App){}
    handle(thing, next){
        thing.state = (thing.state + 3)
        return next(thing)
    }
}

export {
    ClassA,
    ClassB,
    ClassC,
    PipeA,
    PipeB,
    PipeC,
    PipeState
}
