/* global beforeEach,afterEach,test,expect */

import {PipeA, PipeB, PipeC, PipeD} from "./mocks"
import Container from "../src/Container"
import Kernel from "../src/Services/App/Kernel"
import AppServiceProvider from "../src/Services/App/AppServiceProvider"
import ErrorHandler from "../src/Exceptions/ErrorHandler"

let container = new Container
container.debug(false)
container.errorHandler(ErrorHandler)

beforeEach(() => {
	container = new Container
	container.debug(false)
	container.errorHandler(ErrorHandler)
	container.register(AppServiceProvider)
	container.bootProviders()
})

test('can pipe state through handle', () => {

	const kernel = container.make('Kernel')

	kernel
		.send({ state: 1 })
		.through([PipeA, PipeB, PipeC, PipeD])
		.via('handle')
		.then((obj) => {
			expect(obj.state).toBe(5)
		})

	kernel
		.setMiddleware([PipeA, PipeB, PipeC, PipeD])
		.handle({ state: 1 },(obj) => {
			expect(obj.state).toBe(5)
		})
})


test('can pipe state through handle alias', () => {

	const kernel = container.make('Kernel')

	kernel
		.setMiddleware([PipeA, PipeB, PipeC, PipeD])
		.handle({ state: 1 },(obj) => {
			expect(obj.state).toBe(5)
		})
})


test('can pipe state through terminate', () => {

	const kernel = container.make('Kernel')

	kernel
		.send({ state: 5 })
		.through([PipeA, PipeB, PipeC, PipeD])
		.via('terminate')
		.then((obj) => {
			expect(obj.state).toBe(1)
		})
})

test('can pipe state through terminate alias', () => {

	const kernel = container.make('Kernel')

	kernel
		.setMiddleware([PipeA, PipeB, PipeC, PipeD])
		.terminate({ state: 5 }, (obj) => {
			expect(obj.state).toBe(1)
		})
})
