/* global beforeEach,test,expect */

import Container from "../src/Container"
import ErrorHandler from '../src/Exceptions/ErrorHandler'
import Exception from '../src/Exceptions/Exception'

let container = new Container
container.debug(false)
container.errorHandler(ErrorHandler)

beforeEach(() => {
	container = new Container
	container.debug(false)
	container.errorHandler(ErrorHandler)
})

test('Can instantiate instance of itself.', () => {
	expect(container).toBeInstanceOf(Container)
})

test('Can instantiate instance of error handler.', () => {
	expect(container._errorHandler).toBeInstanceOf(ErrorHandler)
})

test('ErrorHandler can handle errors thrown by bindings without stopping execution.', () => {
	container._errorHandler.handle = (error) => error instanceof Error
	container.bind('Exception', () => {
		throw new Exception('This should be handled.')
	})
	expect(container.make('Exception')).toBe(true)
})


test('Errors', () => {
	container.bind('Error', () => {
		throw new Error('This should not be handled.')
	})
	expect(container.make('Error')).toBeUndefined()
})

test('Errors receive instance of container if their handle() method is called by the Exception ErrorHandler.', () => {

	container.bind('Exception', () => {
		const error = new Exception('This should be handled.')
		error.handle = (app) => app
		throw error
	})
	expect(container.make('Exception')).toBeInstanceOf(Container)
})

test('Container will throw exception if concrete instance is undefined.', () => {
	container.bind('test', () => undefined)
	expect(container.make('test')).toBeInstanceOf(Error)
	expect(container.getInstance('test')).toBeInstanceOf(Error)
})
