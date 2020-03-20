/* global beforeEach,afterEach,test,expect */
import Validator from "../src/Support/Validator"

test('can make instance of self', () => {
	const validator = new Validator
	expect(validator.make()).toBeInstanceOf(Validator)
})

test('can set and clear message', () => {
	const validator = new Validator
	validator.setMessage('Invalid')
	expect(validator.message).toEqual("Invalid")
	validator.clearMessage()
	expect(validator.message).toBeNull()
})

test('can sync responses with self', () => {
	const validator = new Validator

	validator.sync({
		message: "error",
		errors: { field: ["first error"] }
	})
	expect(validator.has('field')).toBeTruthy()
	expect(validator.firstEntry).toBe("first error")
	expect(validator.get('field')).toContain("first error")
	expect(validator.all()).toMatchObject({ field: ["first error"] })
	expect(validator.isInvalid).toBeTruthy()
	expect(validator.message).toBe("error")
	expect(validator.all()).toStrictEqual({
		field: [
			"first error",
		]
	})
})

test('can clear state', () => {
	const validator = new Validator
	validator.sync({
		message: "error",
		exception: {},
		errors: { field: ["first error"] }
	})
	expect(validator.has('field')).toBeTruthy()
	validator.clear()
	expect(validator.message).toBeNull()
	expect(validator.exception).toBeNull()
	expect(validator.firstEntry).toBeNull()
	expect(validator.has('field')).toBeFalsy()
})

test('can get first error of multiple', () => {
	const validator = new Validator
	validator.sync({
		errors: {
			fieldName: [
				"first error",
				"second error",
			]
		}
	})
	expect(validator.first('fieldName')).toEqual("first error")
})

test('can check multiple fields', () => {
	const validator = new Validator

	validator.sync({
		message: "error",
		exception: {},
		errors: {
			fieldName: [
				"first error",
			]
		}
	})
	expect(validator.hasAny(['fieldName', 'missing'])).toBeTruthy()
})

test('can set and forget errors', () => {
	const validator = new Validator
	validator.setErrors({
		fieldName: ["error"]
	})

	expect(validator.has('fieldName')).toBeTruthy()
	validator.forget('fieldName')
	expect(validator.first('fieldName')).toBeNull()
	expect(validator.first('fieldName', true)).toBeTruthy()


	validator.put('fieldName', "New Error")
	validator.put('fieldName', "New Error2")
	expect(validator.has('fieldName')).toBeTruthy()

	validator.forget('fieldName')
	expect(validator.first('fieldName')).toBeNull()
})

test('can cleanup / format nested fieldNames', () => {
	const validator = new Validator
	validator.setErrors({
		'nested.field': ["nested.field error"]
	})
	expect(validator.has('nested.field')).toBeTruthy()
	expect(validator.first('nested.field')).toEqual("nested field error")
})

test('can fallback to defaults', () => {
	const validator = new Validator
	expect(validator.get('field', ['fallback'])).toStrictEqual(['fallback'])
})