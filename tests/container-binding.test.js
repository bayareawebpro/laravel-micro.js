/* global beforeEach,afterEach,test,expect */

import Container from "../src/Container"
import ErrorHandler from '../src/Exceptions/ErrorHandler'

let container = new Container
container.debug(false)

afterEach(() => {
	container = new Container
	container.errorHandler(ErrorHandler)
	container.debug(false)
});


test('will throw Binding exception if not bound.', () => {
	try{
		container.make('test')
	}catch (e) {
		expect(e.toString()).toContain('Binding Exception')
	}
})

test('will resolve null value from binding.', () => {
	container.bind('null', ()=>null)
	expect(container.isBound('null')).toBeTruthy()
	expect(container.make('null')).toBeNull()
})

test('can bind / resolve objects and primitives.', () => {

	container.bind('object', {objectResult: true})
	container.bind('array', ['test'])
	container.bind('boolean', true)


	expect(container.isBound('object')).toBeTruthy()
	expect(container.isBound('array')).toBeTruthy()
	expect(container.isBound('boolean')).toBeTruthy()


	const {objectResult} = container.make('object')
	const arrayResult = container.make('array')
	const booleanResult = container.make('boolean')

	expect(objectResult).toBeTruthy()
	expect(booleanResult).toBeTruthy()
	expect(arrayResult.length === 1).toBeTruthy()

	expect(container.isConcrete('object')).toBeTruthy()

	expect(container.isResolved('object')).toBeTruthy()
	expect(container.canShare('object')).toBeTruthy()


	expect(container.isResolved('array')).toBeTruthy()
	expect(container.canShare('array')).toBeTruthy()

	expect(container.isResolved('boolean')).toBeTruthy()
	expect(container.canShare('boolean')).toBeTruthy()
})


test('can bind abstract instances of objects with callbacks which are resolved to concrete states.', () => {
	container.bind('commonArray', () => {
		return [{
			result: true
		}]
	})
	container.bind('commonObject', () => {
		return {
			result: true
		}
	})
	expect(container.isClass('commonObject')).toBeFalsy()
	expect(container.isConcrete('commonObject')).toBeFalsy()

	const commonArray = container.make('commonArray')
	expect(Array.isArray(commonArray)).toBeTruthy()
	expect(commonArray.length === 1).toBeTruthy()
	expect(typeof commonArray[0] === 'object').toBeTruthy()
	expect(typeof commonArray[0].result === 'boolean').toBeTruthy()


	const commonObject = container.make('commonObject')
	expect(typeof commonObject === 'object').toBeTruthy()
	expect(typeof commonObject.result === 'boolean').toBeTruthy()
})

test('can rebound callbacks to their initial state.', () => {
	container.bind('commonObject', () => {
		return {
			result: true
		}
	})
	let commonObject = container.make('commonObject')

	expect(commonObject.result === true).toBeTruthy()

	commonObject.result = false

	expect(commonObject.result === false).toBeTruthy()


	commonObject = container.rebound('commonObject')
	expect(commonObject.result === true).toBeTruthy()
})

test('can set shared instances.', () => {
	container.setInstance('test', true, true)
	expect(container.make('test')).toBeTruthy()
})

test('can destroy bindings.', () => {
	container.bind('test', () => true)
	expect(container.make('test')).toBeTruthy()
	expect(container.destroy('test')).toBeTruthy()
	expect(container.destroy('test')).toBeFalsy()
	expect(container.unBind('test')).toBeInstanceOf(Container)
})

