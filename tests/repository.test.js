/* global beforeEach,afterEach,test,expect */

import Repository from "../src/Support/Repository"


test('can make instance of self.', () => {
	const mock = {test:123}
	const repo = new Repository()
	expect(repo.make(mock).all()).toMatchObject(mock)
})

test('can sync self with object.', () => {
	const repo = new Repository()
	repo.sync({
		form:{ name: 'John', email: 'john@doe.person'}
	});
	expect(repo.all()).toStrictEqual({
		form:{ name: 'John', email: 'john@doe.person' }
	})

	expect(repo.hasEntries('form')).toBeTruthy()
	expect(repo.hasEntries('missing')).toBeFalsy()
})

test('can get and set nested properties with dotSyntax.', () => {
	const repo = new Repository()
	repo.set('form.name', 'updated')
	repo.set('form.location', 'exists')
	expect(repo.get('form.name')).toEqual('updated')
	expect(repo.get('form.location')).toEqual('exists')
})

test('can update properties using dotSyntax keys.', () => {
	const repo = new Repository()
	repo.update({
		'form.name': 'John',
		'form.email': 'john@doe.person',
		'form.message': null,
	});
	expect(repo.all()).toStrictEqual({
		form:{
			name: 'John',
			email: 'john@doe.person',
			message: null,
		}
	})
	expect(repo.has('form')).toBeTruthy()
	expect(repo.exists('form.name')).toBeTruthy()
	expect(repo.has('form.message')).toBeTruthy()
	expect(repo.exists('form.message')).toBeFalsy()
})

test('can find and merge with nested object using dotSyntax.', () => {
	const repo = new Repository({
		form: { location: {test: 123}}
	})
	repo.merge('form.location', {
		lat: 1285.0001,
		lon: -1285.0001
	});
	repo.put('form.location.test', 'updated')

	expect(repo.all()).toStrictEqual({
		form:{
			location:{
				test: 'updated',
				lat: 1285.0001,
				lon: -1285.0001
			}
		}
	})
})

test('can find and update objects within arrays based using a partial object.', () => {
	const repo = new Repository({
		items:[
			{id: 1, label: 1},
			{id: 2, label: 2},
			{id: 3, label: 3},
			{id: 4, label: 4},
		],
	})
	repo.mergeWhere('items', 'id', {id: 3, label: 'updated'});
	expect(repo.firstWhere('items', 'id',3)).toStrictEqual({id: 3, label: 'updated'})
})

test('can pull, forget and reject values from objects nested in arrays.', () => {
	const repo = new Repository({
		nested: {
			items:[
				{id: 0, label: 'item0'},
				{id: 1, label: 'item1'},
				{id: 2, label: 'item2'},
				{id: 3, label: 'item3'},
				{id: 4, label: 'item4'},
			],
		}
	})


	// Pull Label from Item1
	expect(repo.pull('nested.items.0.label')).toStrictEqual('item0')
	expect(repo.get('nested.items.0')).toStrictEqual({id: 0})

	// Forget First Item (index zero)
	repo.forget('nested.items.0')

	// Index Zero is Item 1
	expect(repo.get('nested.items.0')).toStrictEqual({id: 1, label: 'item1'})

	// Reject Index Zero Item 1
	repo.reject('nested.items', repo.get('nested.items.0'))

	// Get Index Zero Item 2
	expect(repo.get('nested.items.0')).toStrictEqual({id: 2, label: 'item2'})

	repo.rejectWhere('nested.items', 'id', 2)

	expect(repo.get('nested.items.0')).toStrictEqual({id: 3, label: 'item3'})

})


test('can append and prepend to arrays.', () => {
	const repo = new Repository({
		nested: {
			items:[
				{id: 1, label: 1},
				{id: 2, label: 2},
				{id: 3, label: 3},
				{id: 4, label: 4},
			],
		}
	})
	repo.prepend('nested.items', {id: 0, label: 0})
	repo.append('nested.items', {id: 5, label: 5})

	expect(repo.hasEntries('nested.items')).toBeTruthy()
	expect(repo.hasValue('nested.items.0.id',0)).toBeTruthy()

	expect(repo.get('nested.items.0')).toStrictEqual({id: 0, label: 0})
	expect(repo.get('nested.items.5')).toStrictEqual({id: 5, label: 5})

	repo.append('nested.list', 'new')
	expect(repo.hasEntries('nested.list')).toBeTruthy()
})

test('can update nested objects within arrays.', () => {
	const repo = new Repository({
		nested: {
			items:[
				{id: 1, label: 1},
				{id: 2, label: 2},
				{id: 3, label: 3},
				{id: 4, label: 4},
			],
		}
	})
	repo.set('nested.items.0.label','updated')
	expect(repo.hasValue('nested.items.0.label','updated')).toBeTruthy()
})

test('can decrement and increment values.', () => {

	let repo = new Repository({
		form: {
			value: 0,
		}
	})

	repo.increment('form.value')
	expect(repo.get('form.value')).toBe(1)

	repo = new Repository()
	repo.increment('form.value', 5)
	repo.decrement('form.value')
	expect(repo.get('form.value')).toBe(5)

	repo = new Repository()
	repo.decrement('form.value')
	expect(repo.get('form.value')).toBe(-1)
})


test('will fallback to value using get.', () => {
	let repo = new Repository({
		some: {
			nested: {

			},
		}
	})
	expect(repo.get('some.nested.value', 0)).toBe(0)
})