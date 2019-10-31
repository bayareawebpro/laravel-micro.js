/* global beforeEach,test,expect */

import Container from "../src/Container"
import ErrorHandler from '../src/Exceptions/ErrorHandler'

let container = new Container
container.debug(false)
container.errorHandler(ErrorHandler)

beforeEach(() => {
	container = new Container
	container.debug(false)
	container.errorHandler(ErrorHandler)
})

test('Container can set / get debugging (log recording) via assignment or method', () => {
	container.debugging = true
	expect(container.debugging).toBe(true)

	container.debugging = false
	expect(container.debugging).toBe(false)

	container.debug(true)
	expect(container.debugging).toBe(true)
})

test('Container can get / set & clear logs.', () => {
	container.debugging = true

	container.bind('test', true)
	expect(container.logOutput.length).toBe(1)

	container.flushLogs()
	expect(container.logOutput.length).toBe(0)

	container.logOutput = [1,2]
	expect(container.logOutput.length).toBe(2)
})

test('Container will throw exception if concrete instance is undefined.', () => {
	container.bind('test', () => undefined)
	expect(container.make('test')).toBeInstanceOf(Error)
	expect(container.getInstance('test')).toBeInstanceOf(Error)
})
