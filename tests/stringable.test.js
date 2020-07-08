/* global beforeEach,afterEach,test,expect */
import Stringable from "../src/Support/Stringable"

test('make instance of self', () => {
    expect(Stringable.of('Test')).toBeInstanceOf(Stringable)
})

test('undefined', () => {
    expect(Stringable.of(undefined).toString()).toStrictEqual('')
    expect(Stringable.of(null).toString()).toStrictEqual('')
    expect(Stringable.of('').toString()).toStrictEqual('')
})

test('cast to string', () => {
    expect(('' + Stringable.of('Test'))).toEqual('Test')
})

test('dump and self', () => {
    expect(Stringable.of('Test').dump()).toBeInstanceOf(Stringable)
})

test('string after value', () => {
    expect(
        Stringable
            .of('John Joe Doe')
            .after('John Joe')
            .trim(' ')
            .toString()
    ).toEqual('Doe')
})

test('string before value', () => {
    expect(
        Stringable
            .of('John Joe Doe')
            .before('Doe')
            .trim(' ')
            .toString()
    ).toEqual('John Joe')
})

test('uppercase first value', () => {
    expect(
        Stringable
            .of('test')
            .ucfirst()
            .toString()
    ).toEqual('Test')
})

test('uppercase value', () => {
    expect(
        Stringable
            .of('test')
            .upper()
            .toString()
    ).toEqual('TEST')
})

test('lowercase value', () => {
    expect(
        Stringable
            .of('TEST')
            .lower()
            .toString()
    ).toEqual('test')
})

test('camelcase value', () => {
    expect(
        Stringable
            .of('Test Test')
            .camel()
            .toString()
    ).toEqual('testTest')
})

test('snakecase value', () => {
    expect(
        Stringable
            .of('Test Test')
            .snake()
            .toString()
    ).toEqual('test_test')
})


test('kebabcase value', () => {
    expect(
        Stringable
            .of('Test Test')
            .kebab()
            .toString()
    ).toEqual('test-test')
})

test('titlecase value', () => {
    expect(
        Stringable
            .of('test test')
            .title()
            .toString()
    ).toEqual('Test Test')
})

test('append and prepend strings to value', () => {
    expect(
        Stringable
            .of('Joe')
            .append(' Doe')
            .prepend('John ')
            .toString()
    ).toEqual('John Joe Doe')
})

test('append and prepend strings to value', () => {
    expect(
        Stringable
            .of('Joe')
            .append(' Doe')
            .prepend('John ')
            .toString()
    ).toEqual('John Joe Doe')
})

test('replace strings in value', () => {
    expect(
        Stringable
            .of('John Doe')
            .replace('John', 'Jane')
            .prepend('Ms. ')
            .toString()
    ).toEqual('Ms. Jane Doe')
})

test('substr string from value', () => {
    expect(
        Stringable
            .of('John Joe Doe')
            .substr(5, 3)
            .toString()
    ).toEqual('Joe')
})

test('value contains string', () => {
    const str = Stringable.of('John Joe Doe')
    expect(str.contains('Joe')).toBeTruthy()
    expect(str.contains('Jane')).toBeFalsy()
})

test('value contains all strings', () => {
    const str = Stringable.of('John Joe Doe')
    expect(str.containsAll('John','Joe','Doe')).toBeTruthy()
    expect(str.containsAll('Jane','Joe','Doe')).toBeFalsy()
})

test('value matches exactly', () => {
    const str = Stringable.of('John Joe Doe')
    expect(str.exactly('John Joe Doe')).toBeTruthy()
    expect(str.exactly('Jane Joe Doe')).toBeFalsy()
})

test('value explode', () => {
    const arr = Stringable.of('John Joe Doe').explode(' ')
    expect(arr).toBeInstanceOf(Array)
    expect(arr.length).toEqual(3)
})

test('value is other string', () => {
    const str1 = Stringable.of('John Joe Doe')
    const str2 = Stringable.of('Jane Joe Doe')
    const str3 = Stringable.of(str1.toString())
    expect(str1.is(str2)).toBeFalsy()
    expect(str1.is(str3)).toBeTruthy()
})

test('value is any string', () => {
    const str1 = Stringable.of('John Joe Doe')
    const str2 = Stringable.of('Jane Joe Doe')
    const str3 = Stringable.of(str1.toString())
    expect(str1.isAny(str2)).toBeFalsy()
    expect(str1.isAny(str2, str3)).toBeTruthy()
})

test('value is empty string', () => {
    const str = Stringable.of('')
    expect(str.isEmpty()).toBeTruthy()

    const str2 = Stringable.of('Test')
    expect(str2.isEmpty()).toBeFalsy()
})