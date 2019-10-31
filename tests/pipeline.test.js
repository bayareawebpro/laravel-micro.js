/* global beforeEach,afterEach,test,expect */

import {PipeA, PipeB, PipeC} from "./mocks"
import Container from "../src/Container"
import Kernel from "../src/Services/App/Kernel"
import AppServiceProvider from "../src/Services/App/AppServiceProvider"

test('can pipe state through classes', () => {

	const container = new Container
	container.register(AppServiceProvider)
	container.bootProviders()

	const kernel = container.make('Kernel')

	kernel.setMiddleware([PipeA, PipeB, PipeC])

	const result1 = kernel.handle({ state: 0 }, (obj) => {
		obj.state = (obj.state * 2)
		return obj
	})
	expect(result1.state).toBe(10)

	const result3 = kernel.terminate({ state: 10 }, (obj) => {
		obj.state = (obj.state / 2)
		return obj
	})
	expect(result3.state).toBe(5)
})
