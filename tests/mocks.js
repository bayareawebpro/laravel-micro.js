class ClassA {
    constructor(classB, classC) {
        this.classB = classB
        this.classC = classC
    }
}

class ClassB {
    constructor(classC) {
        this.classC = classC
    }
}

class ClassC {
    constructor() {
    }
}

class ClassD {
    constructor(Fail) {
        console.log(Fail)
    }
}

class PipeA{
    constructor(App){}
    handle(thing, next){
        thing.state++
        return next(thing)
    }
    terminate(thing, next){
        return next(thing)
    }
}
class PipeB{
    constructor(App){}
    handle(thing, next){
        thing.state = (thing.state + 1)
        return next(thing)
    }
    terminate(thing, next){
        return next(thing)
    }
}
class PipeC{
    constructor(App){}
    handle(thing, next){
        thing.state = (thing.state + 3)
        return next(thing)
    }
    terminate(thing, next){
        return next(thing)
    }
}

export {
    ClassA,
    ClassB,
    ClassC,
    ClassD,
    PipeA,
    PipeB,
    PipeC
}
