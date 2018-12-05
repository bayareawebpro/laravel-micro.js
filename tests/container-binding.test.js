import Container from "../src/Container"
import Handler from '../src/Exceptions/Handler'

let container = new Container
afterEach(() => {
    container = new Container
    container.errorHandler(Handler)
});


test('Container can directly bind objects and primitives and resolve their states.', () => {

    container.bind( 'object', {objectResult: true})
    container.bind( 'array', ['test'])
    container.bind( 'boolean', true)


    expect(container.isBound('object')).toBe(true)
    expect(container.isBound('array')).toBe(true)
    expect(container.isBound('boolean')).toBe(true)


    const {objectResult} = container.make('object')
    const arrayResult = container.make('array')
    const booleanResult = container.make('boolean')

    expect(objectResult).toBe(true)
    expect(booleanResult).toBe(true)
    expect(arrayResult.length === 1).toBe(true)


    expect(container.isResolved('object')).toBe(true)
    expect(container.canShare('object')).toBe(true)


    expect(container.isResolved('array')).toBe(true)
    expect(container.canShare('array')).toBe(true)

    expect(container.isResolved('boolean')).toBe(true)
    expect(container.canShare('boolean')).toBe(true)
})



test('Container can bind abstract instances of objects with callbacks which are resolved to concrete states.', () => {
    container.bind( 'commonArray', () => {
        return [{
            result: true
        }]
    })
    container.bind( 'commonObject', () => {
        return {
            result: true
        }
    })
    const commonArray = container.make('commonArray')

    expect(Array.isArray(commonArray)).toBe(true)
    expect(commonArray.length === 1).toBe(true)
    expect(typeof commonArray[0] === 'object').toBe(true)
    expect(typeof commonArray[0].result === 'boolean').toBe(true)


    const commonObject = container.make('commonObject')
    expect(typeof commonObject === 'object').toBe(true)
    expect(typeof commonObject.result === 'boolean').toBe(true)
})


test('Container can rebound callbacks to their initial state.', () => {
    container.bind( 'commonObject', () => {
        return {
            result: true
        }
    })
    let commonObject = container.make('commonObject')

    expect(commonObject.result === true).toBe(true)

    commonObject.result = false

    expect(commonObject.result === false).toBe(true)


    commonObject = container.rebound('commonObject')
    expect(commonObject.result === true).toBe(true)
})