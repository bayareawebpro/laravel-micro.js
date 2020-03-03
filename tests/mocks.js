import ServiceProvider from "../src/Support/ServiceProvider"

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
    constructor(App){
        this.app = App
    }
    handle(obj, next){
        obj.state++
        return next(obj)
    }
    terminate(obj, next){
        obj.state--
        return next(obj)
    }
}
class PipeB{
    constructor(App){
        this.app = App
    }
    handle(obj, next){
        obj.state++
        return next(obj)
    }
    terminate(obj, next){
        obj.state--
        return next(obj)
    }
}
class PipeC{
    constructor(App){
        this.app = App
    }
    handle(obj, next){
        obj.state++
        return next(obj)
    }
    terminate(obj, next){
        obj.state--
        return next(obj)
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
