/* global beforeEach,afterEach,test,expect */
import {CompleteManager, IncompleteManager, AlmostCompleteManager} from './mocks';
import Container from "../src";

var app = new Container();

test('returns the default driver', () => {
    expect(
        new CompleteManager(app).getDefaultDriver()
    ).toEqual('default');
})

test('returns an object', () => {
    expect(
        new CompleteManager(app).driver().type
    ).toEqual('default');
})

test('requires defaultDriver method to be implemented', () => {
    try {
        new IncompleteManager(app).driver()
    } catch (e) {
        expect(e.toString()).toContain('Class "Manager" requires children classes to implement the method "getDefaultDriver"')
    }
})

test('driver methods need to be implemented', () => {
    try {
        new IncompleteManager(app).driver('nonExisting')
    } catch (e) {
        expect(e.toString()).toContain('Driver nonExisting not supported.')
    }
})

test('default driver must return a valid driver', () => {
    try {
        new AlmostCompleteManager(app).driver()
    } catch (e) {
        expect(e.toString()).toContain('Unable to resolve NULL driver for AlmostCompleteManager.')
    }
})

test('custom drivers can be added', () => {
    let manager = new CompleteManager(app);
    manager.extend('custom', (app) => {
        return {
            type: 'a custom driver'
        }
    })

    expect(
        manager.driver('custom').type
    ).toEqual('a custom driver')
})
