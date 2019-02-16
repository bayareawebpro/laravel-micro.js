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

    config.set('my', { nested: true })
    expect(config.get('my.nested')).toBeTruthy()
})
