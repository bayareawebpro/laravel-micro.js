/* global beforeEach,afterEach,test,expect */

import Container from "../src/Container"
import {PipeState, PipeA, PipeB, PipeC} from "./Mocks"
import Kernel from "../src/Services/App/Kernel"
import AppServiceProvider from "../src/Services/App/AppServiceProvider"

test('Can Pipe object state through classes via a specified method.', () => {

	const container = new Container
	container.register(AppServiceProvider)
	container.bootProviders()

	const kernel = container.make('Kernel')

	kernel.setMiddleware([PipeA, PipeB, PipeC])

	const result = kernel.handle(PipeState, (obj) => {
		obj.state = (obj.state * 2)
		return obj
	})

	expect(result.state).toBe(10)
})
