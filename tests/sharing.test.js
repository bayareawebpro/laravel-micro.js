import Container from "../src/Container"
test('Container can "share" aliases with other objects as callable functions.', () => {
    const container = new Container
    container.bind('isTrue', true, true)

    let thing1 = {}, thing2 = {}
    container.share('isTrue').withOthers(thing1,thing2)
    expect(typeof thing1.$isTrue ==='function').toBe(true)
    expect(typeof thing2.$isTrue ==='function').toBe(true)
    expect(container.isShared('isTrue')).toBeTruthy()
    expect(thing1.$isTrue()).toBeTruthy()
    expect(thing2.$isTrue()).toBeTruthy()
})
test('Container cannot "share" aliases unless specified during binding.', () => {
    const container = new Container
    container.bind('isTrue', true, false)

    let thing1 = {}
    container.share('isTrue').withOthers(thing1)
    expect(typeof thing1.$isTrue ==='function').toBe(false)
    expect(thing1.$isTrue).toBeUndefined()
})


test('Container can track and remove shared references when services are unshared.', () => {
    const container = new Container
    container.bind('sharable', {test: 'test'}, true)

    let sharedWith = {}
    container.share('sharable').withOthers(sharedWith)

    expect(typeof sharedWith.$sharable ==='function').toBe(true)
    expect(container.isShared('sharable')).toBeTruthy()

    container.unShare('sharable')
    expect(sharedWith.test).toBeUndefined()
    expect(container.isShared('sharable')).toBeFalsy()
})