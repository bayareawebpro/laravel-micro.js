/* global beforeEach,test,expect */

import Container from "../src/Container"
import ErrorHandler from '../src/Exceptions/ErrorHandler'
import Exception from '../src/Exceptions/Exception'
import AppServiceProvider from "../src/Services/App/AppServiceProvider"

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
	expect(container).toHaveProperty('providers')
	expect(container).toHaveProperty('bindings')
	expect(container).toHaveProperty('resolved')
	expect(container).toHaveProperty('sharable')
	expect(container).toHaveProperty('sharedWith')
	expect(container).toHaveProperty('reservedWords')
})

test('Container will return a reserved words list for logging purposes.', () => {
	container.register(AppServiceProvider)
	container.bind('testA', () => undefined)
	container.bind('testB', () => undefined)
	container.bootProviders()
	expect(Array.isArray(container.reservedWords)).toBeTruthy()
	expect(container.reservedWords.length).toBe(4)
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
	expect(container.isBound('Error')).toBeTruthy()
	expect(container.make('Error')).toBeUndefined()
})

test('Errors receive instance of container if their handle() method is called by the Exception ErrorHandler.', () => {

	container.bind('Exception', () => {
		const error = new Exception('This should be handled.')
		error.handle = (App) => App
		throw error
	})
	expect(container.make('Exception')).toBeInstanceOf(Container)
})

test('Container will throw exception if concrete instance is undefined.', () => {
	container.bind('test', () => undefined)
	expect(container.make('test')).toBeInstanceOf(Error)
	expect(container.getInstance('test')).toBeInstanceOf(Error)
})
