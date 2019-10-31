/* global beforeEach,afterEach,test,expect */

import Container from "../src/Container"
import ErrorHandler from "../src/Exceptions/ErrorHandler"
import {ClassA, ClassB, ClassC, ClassD} from "./mocks"

let container = new Container
container.debug(false)
beforeEach(() => {
	container = new Container
	container.errorHandler(ErrorHandler)
	container.debug(false)
});



test('Container can resolve dependencies from parameters of classes and functions / callbacks.', () => {
	container.bind('classA', ClassA, true)
	container.bind('classB', ClassB, true)
	container.bind('classC', ClassC, true)

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



test('Container will throw a "Exception" when a missing dependency is detected.', () => {
	container.bind('ClassD', ClassD)
	try {
		const classD = container.make('classD')
	} catch (e) {
		console.error(e)
		expect(e.toString()).toContain(' No Binding found')
		expect(e).toBeInstanceOf(Error)
	}
})




test('Container will throw a "Circular Dependency Exception" when a stack overflow is detected.', () => {
	class CircularA {
		constructor(CircularB) {
		}
	}

	class CircularB {
		constructor(CircularA) {
		}
	}
	container.bind('CircularA', CircularA, true)
	container.bind('CircularB', CircularB, true)

	try {
		const classA = container.make('CircularA')
	} catch (e) {
		expect(e.toString()).toContain('Circular Dependency Exception')
		expect(e).toBeInstanceOf(Error)
	}
})


test('Container will resolve shared instances of shared bindings once instantiated.', () => {

	class TestClass {
		constructor() {
			this.state = 0
		}
	}

	container.bind('TestClass', TestClass, true)

	let classA = container.make('TestClass')
	classA.state = 1

	expect(container.make('TestClass').state).toBe(1)
})


test('Container will not resolve shared instances of unsharable bindings.', () => {

	class TestClass {
		constructor() {
			this.state = 0
		}
	}
	container.bind('TestClass', TestClass, false)

	let testInstance = container.make('TestClass')
	testInstance.state = 1

	expect(container.make('TestClass').state).toBe(0)
})