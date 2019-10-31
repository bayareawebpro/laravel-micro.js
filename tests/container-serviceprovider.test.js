/* global beforeEach,afterEach,test,expect */

import Container from "../src/Container"
import AppServiceProvider from '../src/Services/App/AppServiceProvider'
import ServiceProvider from "../src/Support/ServiceProvider"

test('Registers Classes which extend ServiceProvider class.', () => {
	const container = new Container
	container.debug(false)
	container.register(AppServiceProvider)

	expect(container.isRegistered('AppServiceProvider')).toBe(true)
	expect(Object.keys(container._providers).length).toBe(1)

	const providerInstance = container.getProvider('AppServiceProvider')
	expect(providerInstance).toBeInstanceOf(AppServiceProvider)

	expect(Array.isArray(providerInstance.provides)).toBe(true)
	expect(providerInstance.provides.length).toBe(2)
})


test('Providers can have their boot method called when bootProviders() is called.', () => {
	const container = new Container
	container.debug(false)
	container.register(AppServiceProvider)

	const providerInstance = container.getProvider('AppServiceProvider')

	expect(providerInstance.isDeferred).toBeFalsy()
	expect(providerInstance.isBootable).toBeTruthy()
	expect(providerInstance.isBooted).toBeFalsy()

	container.bootProviders()

	expect(providerInstance.isBooted).toBeTruthy()
})


test('Deferred Providers will not have their boot method called when bootProviders() is called.', () => {
	const container = new Container
	container.debug(false)
	container.register(AppServiceProvider)

	const providerInstance = container.getProvider('AppServiceProvider')

	providerInstance.deferred = true
	expect(providerInstance.isDeferred).toBeTruthy()
	expect(providerInstance.isBootable).toBeTruthy()
	expect(providerInstance.isBooted).toBeFalsy()

	container.bootProviders()

	expect(providerInstance.isBooted).toBeFalsy()
})


test('Deferred Providers will have their boot method called their provided service is resolved.', () => {
	const container = new Container
	container.debug(false)
	container.register(AppServiceProvider)

	const providerInstance = container.getProvider('AppServiceProvider')

	providerInstance.deferred = true
	providerInstance.boot = () => {
		container.bind('boundIfBooted', true)
	}

	expect(providerInstance.isDeferred).toBeTruthy()

	container.bootProviders()
	expect(providerInstance.isBooted).toBeFalsy()

	const app = container.make('App')
	expect(app.isBound('boundIfBooted')).toBeTruthy()
	expect(providerInstance.isBooted).toBeTruthy()
})


 test('Container will throw exception if registered service is not bound.', () => {
 	const container = new Container
	 container.debug(false)

 	class TestProvider extends ServiceProvider{
 		constructor(App) {
 			super(App)
 			this.deferred = false
 		}
 		register() {

 		}
 		get provides() {
 			return ['NotFound']
 		}
 	}
 	container.register(TestProvider)
 	container.bootProviders()
 	try{
		container.make('NotFound')
	}catch (e) {
		expect(e.toString()).toContain(' No Binding found')
	}
 })