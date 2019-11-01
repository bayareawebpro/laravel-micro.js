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
        console.info("PipeA Handled")
        return next(obj)
    }
    terminate(obj, next){
        obj.state--
        console.info("PipeA Terminated")
        return next(obj)
    }
}
class PipeB{
    constructor(App){
        this.app = App
    }
    handle(obj, next){
        obj.state++
        console.info("PipeB Handled")
        return next(obj)
    }
    terminate(obj, next){
        obj.state--
        console.info("PipeB Terminated")
        return next(obj)
    }
}
class PipeC{
    constructor(App){
        this.app = App
    }
    handle(obj, next){
        obj.state++
        console.info("PipeC Handled")
        return next(obj)
    }
    terminate(obj, next){
        obj.state--
        console.info("PipeC Terminated")
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
