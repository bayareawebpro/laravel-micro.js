/* global beforeEach,afterEach,test,expect */

import {PipeA, PipeB, PipeC} from "./mocks"
import Container from "../src/Container"
import Kernel from "../src/Services/App/Kernel"
import AppServiceProvider from "../src/Services/App/AppServiceProvider"

test('can pipe state through classes', () => {

	const container = new Container
	container.register(AppServiceProvider)
	container.bootProviders()

	const kernel = container
		.make('Kernel')
		.setMiddleware([PipeA, PipeB, PipeC])

	kernel
		.send({ state: 1 })
		.through([PipeA, PipeB, PipeC])
		.via('handle')
		.then((obj) => {
			expect(obj.state).toBe(4)
		})

	const result1 = kernel.handle({ state: 1 }, (obj) => {
		obj.state++
		return obj
	})
	expect(result1.state).toBe(5)

	const result3 = kernel.terminate({ state: 5 }, (obj) => {
		obj.state--
		return obj
	})
	expect(result3.state).toBe(1)
})
