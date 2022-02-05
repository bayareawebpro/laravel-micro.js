/**
 * Binding Mocks
 */
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

/**
 * Pipeline Mocks
 */
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
class PipeD{
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

/**
 * Manager Mocks
 */
import Manager from "../src/Support/Manager"
class IncompleteManager extends Manager {}
class AlmostCompleteManager extends Manager {
    getDefaultDriver() {
        return null;
    }
}
class CompleteManager extends Manager{
    getDefaultDriver() {
        return 'default';
    }
    createDefaultDriver() {
        return {
            type: 'default'
        };
    }
}

export {
    ClassA,
    ClassB,
    ClassC,
    ClassD,
    PipeA,
    PipeB,
    PipeC,
    PipeD,
    CompleteManager,
    IncompleteManager,
    AlmostCompleteManager,
}
