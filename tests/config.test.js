/* global beforeEach,test,expect */

import Container from "../src/Container"
import ErrorHandler from '../src/Exceptions/ErrorHandler'
import ConfigServiceProvider from "../src/Services/Config/ConfigServiceProvider"
import Config from "../src/Services/Config/Config"
import {AppServiceProvider} from "../src"


let container
beforeEach(() => {
	container = new Container
	container.errorHandler(ErrorHandler)
	container.register(AppServiceProvider)
	container.register(ConfigServiceProvider)
	container.bootProviders()
});

test('Can resolve Config Service.', () => {
	const config = container.make('Config')
	expect(config).toBeInstanceOf(Config)
})

test('Can set properties that dont exist.', () => {
	const config = container.make('Config')
	config.set('my.nested.prop', true)
	expect(config.get('my.nested.prop')).toBeTruthy()
})

test('Can overwrite parents of nested properties.', () => {
	const config = container.make('Config')

	config.set('my.nested.prop', true)
	expect(config.get('my.nested.prop')).toBeTruthy()

	config.set('my', {nested: true})
	expect(config.get('my.nested')).toBeTruthy()
})

test('Can get all properties.', () => {
	const config = container.make('Config')
	expect(Object.keys(config.all())).toEqual(["env", "debug"])
})


test('Can make property new instance of self.', () => {
	const config = container.make('Config')
	config.set('my.nested.prop', true)

	const newConfig = config.toConfig('my')
	expect(newConfig).toBeInstanceOf(Config)
	expect(newConfig._app).toBeInstanceOf(Container)
	expect(newConfig.get('nested.prop')).toBeTruthy()

	try{
		config.toConfig('fail')
	}catch (e) {
		expect(e.toString()).toContain('Cannot set Config')
	}
})


test('Can set new instance / root object.', () => {
	const config = container.make('Config')
	config.setInstance({
		isOk: {
			shouldBe: true
		}
	})
	expect(config.get('isOk.shouldBe')).toBeTruthy()

	try{
		config.setInstance(undefined)
	}catch (e) {
		expect(e.toString()).toContain('Cannot set Config')
	}
})

test('Can use env getters.', () => {
	const config = container.make('Config')
	config.set('env', 'testing')
	expect(config.isTesting).toBeTruthy()
	expect(config.isDevelopment).toBeFalsy()
	expect(config.isProduction).toBeFalsy()
})

test('Can fallback to default.', () => {
	const config = container.make('Config')
	expect(config.get('test', 'ok')).toBe('ok')
	expect(config.get('test.nested', 'ok')).toBe('ok')
})
