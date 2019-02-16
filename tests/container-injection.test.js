import Container from "../src/Container"
import ErrorHandler from "../src/Exceptions/ErrorHandler"

let container = new Container
afterEach(() => {
    container = new Container
    container.errorHandler(ErrorHandler)
});

test('Container can resolve dependencies from parameters of classes and functions / callbacks.', () => {
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
    container.bind('classA',ClassA, true)
    container.bind('classB',ClassB, true)
    container.bind('classC',ClassC, true)

    const classA = container.make('classA')
    const classB = container.make('classB')
    const classC = container.make('classC')

    expect(classA).toBeInstanceOf(ClassA)
    expect(classB).toBeInstanceOf(ClassB)
    expect(classC).toBeInstanceOf(ClassC)
    expect(classA.classB).toBeInstanceOf(ClassB)
    expect(classA.classC).toBeInstanceOf(ClassC)
    expect(classB.classC).toBeInstanceOf(ClassC)
    expect(classC).toBeInstanceOf(ClassC)
    expect(container._injections.length).toBe(0)
})

test('Container will throw a "Circular Dependency Exception" when a stack overflow is detected.', () => {
    try{
        class ClassA{
            constructor(classB){
                this.classB = classB
            }
        }
        class ClassB{
            constructor(classA){
                this.classA = classA
            }
        }
        container.bind('classA',ClassA, true)
        container.bind('classB',ClassB, true)

        const classA = container.make('classA')
    }catch (e) {
        expect(e.toString()).toContain('Circular Dependency Exception')
        expect(e).toBeInstanceOf(Error)
    }
})


test('Container will resolve shared instances of shared bindings once instantiated.', () => {
    const container = new Container

    class TestClass{
        constructor(){
            this.state = 0
        }
    }
    container.bind('TestClass',TestClass, true)

    let classA = container.make('TestClass')

    classA.state = 1

    expect(container.make('TestClass').state).toBe(1)
})

test('Container will not resolve shared instances of unsharable bindings.', () => {
    const container = new Container

    class TestClass{
        constructor(){
            this.state = 0
        }
    }
    container.bind('TestClass',TestClass, false)

    let testInstance = container.make('TestClass')

    testInstance.state = 1

    expect(container.make('TestClass').state).toBe(0)
})