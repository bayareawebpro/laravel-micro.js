"use strict";
export default class Repository {

    /**
     * Repository Constructor
     * @param data {Object}
     */
    constructor(data = {}) {
        this._data = data
    }

    /**
     * Make New Instance
     * @param data
     * @return {Repository}
     */
    make(data = {}) {
        return new Repository(data)
    }

    /**
     * Increment Value
     * @param dotSyntax {String}
     * @param fallback {Number}
     * @return {Repository}
     */
    increment(dotSyntax, fallback = 0){
        let value = (this.get(dotSyntax, false) || fallback)
        value++
        this.set(dotSyntax, value)
        return this
    }

    /**
     * Decrement Value
     * @param dotSyntax {String}
     * @param fallback {Number}
     * @return {Repository}
     */
    decrement(dotSyntax, fallback = 0){
        let value = (this.get(dotSyntax, false) || fallback)
        value--
        this.set(dotSyntax, value)
        return this
    }

    /**
     * Update Attributes (allows parsing dotSyntax)
     * @param data {Object}
     * @return {Repository}
     */
    update(data = {}) {
        const state = this.make(Object.assign({}, this._data))
        Object.keys(data || {}).forEach((key) => state.set(key, data[key], false))
        this.sync(state.all())
        return this
    }

    /**
     * Sync Attributes
     * @param data {Object}
     * @return {Repository}
     */
    sync(data = {}) {
        this._data = Object.assign({}, data)
        return this
    }

    /**
     * Merge Object Attributes
     * @param dotSyntax
     * @param objValue {Object}
     * @return {Repository}
     */
    merge(dotSyntax, objValue) {
        const value = this.get(dotSyntax, {})
        this.set(dotSyntax, Object.assign({}, value, objValue))
        return this
    }

    /**
     * Find Object within Array and Merge Attributes
     * @param dotSyntax
     * @param prop {String}
     * @param objValue {Object}
     * @return {Repository}
     */
    mergeWhere(dotSyntax, prop, objValue) {
        const state = this.get(dotSyntax, [])
        const oldObj = state.find((entry) => entry[prop] === objValue[prop])
        state.splice(state.indexOf(oldObj), 1, Object.assign({}, oldObj, objValue))
        this.set(dotSyntax, state)
        return this
    }

    /**
     * Find Object within Array and Merge Attributes
     * @param dotSyntax
     * @param prop {String}
     * @param value {*}
     * @return {*}
     */
    firstWhere(dotSyntax, prop, value) {
        const state = this.get(dotSyntax, [])
        return state.find((entry) => entry[prop] === value)
    }

    /**
     * Attribute Has Value
     * @param dotSyntax {String}
     * @param value {*}
     * @return {boolean}
     */
    hasValue(dotSyntax, value) {
        return (this.get(dotSyntax) === value)
    }

    /**
     * Array or Object Attribute Has Entries
     * @param dotSyntax {String}
     * @return {boolean}
     */
    hasEntries(dotSyntax) {
        const value = this.get(dotSyntax)
        if (value) {
            if (Array.isArray(value)) {
                return value.length > 0
            }
            if (typeof value === 'object') {
                return Object.keys(value).length > 0
            }
        }
        return false
    }

    /**
     * Get Attribute Value
     * @param dotSyntax {String}
     * @param fallback {*}
     * @return {*}
     */
    get(dotSyntax, fallback = null) {
        if (!dotSyntax.includes('.')) {
            return this._data.hasOwnProperty(dotSyntax) ? this._data[dotSyntax] : fallback
        }
        let target = this._data
        dotSyntax.split('.').every((key) => {
            return target = target.hasOwnProperty(key) ? target[key] : undefined
        }, this._data)
        return (typeof target === undefined)
            ? fallback
            : target
    }

    /**
     * Set Attribute Value
     * @param dotSyntax {String}
     * @param value {*}
     * @return {Repository}
     */
    set(dotSyntax, value) {
        if (!dotSyntax.includes('.')) {
            this._data[dotSyntax] = value
        } else {
            let target = this._data
            const keys = dotSyntax.split('.')
            const depth = (keys.length - 1)
            let parentKey = keys[0]
            let parent = target
            keys.every((key, idx) => {
                if (idx < depth) {
                    parent = target;
                    parentKey = key;
                    return target = target[key] || (target[key] = {})
                }
                else if (typeof value === 'undefined') {
                    target[key] = null;
                    delete target[key];
                    if (Array.isArray(target)) {
                        parent[parentKey] = target.filter((item) => item)
                    }
                } else {
                    target[key] = value
                }
                return false
            }, this._data)
        }
        this._data = Object.assign({}, this._data)
        return this
    }

    /**
     * Append Value to Array Attribute
     * @param dotSyntax {String}
     * @param value {*}
     * @return {Repository}
     */
    append(dotSyntax, value) {
        if (this.has(dotSyntax)) {
            this.get(dotSyntax).push(value)
        } else {
            this.set(dotSyntax, [value])
        }
        return this
    }

    /**
     * Prepend Value to Array Attribute
     * @param dotSyntax {String}
     * @param value {*}
     * @return {Repository}
     */
    prepend(dotSyntax, value) {
        let arrayVal = this.get(dotSyntax, [])
        arrayVal.unshift(value)
        this.set(dotSyntax, arrayVal)
        return this
    }

    /**
     * Has Attribute
     * @param dotSyntax {String}
     * @return {Boolean}
     */
    has(dotSyntax) {
        const split = dotSyntax.split('.')
        if (split.length > 1) {
            const last = split.pop()
            return this.get(split.join('.'), {}).hasOwnProperty(last)
        }
        return this._data.hasOwnProperty(dotSyntax)
    }

    /**
     * Attribute Value Exists
     * @param dotSyntax {String}
     * @return {boolean}
     */
    exists(dotSyntax) {
        return ![undefined, null, ''].includes(this.get(dotSyntax))
    }

    /**
     * Put Attribute Value (Alias of Set)
     * @param dotSyntax {String}
     * @param value {*}
     * @return {Repository}
     */
    put(dotSyntax, value) {
        this.set(dotSyntax, value)
        return this
    }

    /**
     * Pull (Get/Remove) Attribute & Value
     * @param dotSyntax {String}
     * @param fallback {*}
     * @return {*}
     */
    pull(dotSyntax, fallback = null) {
        const value = this.get(dotSyntax, fallback)
        this.forget(dotSyntax)
        return value
    }

    /**
     * Reject Entry from Array Attribute
     * @param dotSyntax {String}
     * @param item {*}
     * @return {Repository}
     */
    reject(dotSyntax, item) {
        let entries = this.get(dotSyntax, [])
        entries.splice(entries.findIndex((entry) => entry === item), 1)
        this.set(dotSyntax, entries)
        return this
    }

    /**
     * Reject Entry from Array Attribute
     * @param dotSyntax {String}
     * @param prop {String}
     * @param value {*}
     * @return {Repository}
     */
    rejectWhere(dotSyntax, prop, value) {
        let entries = this.get(dotSyntax, [])
        entries.splice(entries.findIndex((entry) => entry[prop] === value), 1)
        this.set(dotSyntax, entries)
        return this
    }

    /**
     * Forget Attribute
     * @param dotSyntax {String}
     * @return {Repository}
     */
    forget(dotSyntax) {
        this.set(dotSyntax, undefined)
        return this
    }

    /**
     * All Attributes
     * @return {Object}
     */
    all() {
        return this._data
    }
}