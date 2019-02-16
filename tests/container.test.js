import Container from "../src/Container"
import ErrorHandler from '../src/Exceptions/ErrorHandler'
import Exception from '../src/Exceptions/Exception'

let container = new Container
afterEach(() => {
    container = new Container
    container.errorHandler(ErrorHandler)
});

test('Can instantiate instance of itself.', () => {
    expect(container).toBeInstanceOf(Container)
})

test('Can instantiate instance of error handler.', () => {
    expect(container._errorHandler).toBeInstanceOf(ErrorHandler)
})

test('Error ErrorHandler can handle errors thrown by bindings without stopping execution.', () => {
    container._errorHandler.handle = (error) => error instanceof Error
    container.bind('Exception', ()=>{
        throw new Exception('This should be handled.')
    })
    expect(container.make('Exception')).toBe(true)
})

test('Errors receive instance of container if their handle() method is called by the Exception ErrorHandler.', () => {

    container.bind('Exception', ()=>{
        const error = new Exception('This should be handled.')
        error.handle = (app) => app
        throw error
    })
    expect(container.make('Exception')).toBeInstanceOf(Container)
})
