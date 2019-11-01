/* global beforeEach,afterEach,test,expect */

import {PipeA, PipeB, PipeC} from "./mocks"
import Container from "../src/Container"
import Kernel from "../src/Services/App/Kernel"
import AppServiceProvider from "../src/Services/App/AppServiceProvider"

test('can pipe state through classes', () => {

	const container = new Container
	container.debug(true)
	container.register(AppServiceProvider)
	container.bootProviders()

	const kernel = container
		.make('Kernel')
		.setMiddleware([PipeA, PipeB, PipeC])


	const result1 = kernel.handle({ state: 1 }, (obj) => {
		obj.state++
		return obj
	})

	const result3 = kernel.terminate({ state: 5 }, (obj) => {
		obj.state--
		return obj
	})

	expect(result1.state).toBe(5)
	expect(result3.state).toBe(1)
})
