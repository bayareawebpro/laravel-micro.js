"use strict";

/**
 * Stringable Support
 * Contributor: Pablo Villalba
 * Refactoring: Daniel Alvidrez
 */
export default class Stringable {

    /**
     * Stringable Constructor.
     * @param value
     */
    constructor(value) {
        this.value = '';
        if(!this.emptyValues.includes(value)){
            this.value = String(this.value)
        }
    }

    /**
     * Make Instance of String.
     * @param value {String}
     * @return {Stringable}
     */
    static of(value) {
        return new Stringable(value);
    }

    /**
     * Dump Value to Console.
     * @return {Stringable}
     */
    dump() {
        console.info(`Stringable: ${this.value}`)
        return this;
    }

    /**
     * Render Value to String.
     * @return {string}
     */
    toString() {
        return this.value;
    }

    /**
     * String from after substring in value.
     * @param search {String}
     * @return {Stringable}
     */
    after(search) {
        return new Stringable(
            search === '' ? this.value : this.value.split(search).pop()
        );
    }

    /**
     * String from before substring in value.
     * @param search {String}
     * @return {Stringable}
     */
    before(search) {
        return new Stringable(
            search === ''
                ? this.value
                : this.value.split(search)[0]
        );
    }

    /**
     * Trim characters from value.
     * @param chars
     * @return {Stringable}
     */
    trim(...chars) {
        return this.ltrim(...chars).rtrim(...chars)
    }

    /**
     * Trim characters from left side of value.
     * @param chars
     * @return {Stringable}
     */
    ltrim(...chars) {
        chars = chars.length ? chars : [' '];
        return new Stringable(this.value.replace(new RegExp("^[" + chars + "]+"), ""))
    }

    /**
     * Trim characters from right side of value.
     * @param chars {string[]}
     * @return {Stringable}
     */
    rtrim(...chars) {
        chars = chars.length ? chars : [' '];
        return new Stringable(this.value.replace(new RegExp("[" + chars + "]+$"), ""))
    }

    /**
     * Replace characters in value.
     * @param search {String|RegExp}
     * @param replace {String|Function}
     * @return {Stringable}
     */
    replace(search, replace) {
        return new Stringable(this.value.replace(search, replace));
    }

    /**
     * String from sub-string in value.
     * @param start {Number}
     * @param end {Number|null}
     * @return {Stringable}
     */
    substr(start, end = null) {
        return new Stringable(
            this.value.substr(start, end ?? this.length() - start)
        );
    }

    /**
     * Prepend strings to value.
     * @param values ...{String}
     * @return {Stringable}
     */
    prepend(...values) {
        return new Stringable(values.join('') + this.value);
    }

    /**
     * Append strings to value.
     * @param values ...{String}
     * @return {Stringable}
     */
    append(...values) {
        return new Stringable(
            this.value + values.join('')
        );
    }

    /**
     * Uppercase string from value.
     * @return {Stringable}
     */
    upper() {
        return new Stringable(this.value.toUpperCase())
    }

    /**
     * Lowercase string from value.
     * @return {Stringable}
     */
    lower() {
        return new Stringable(this.value.toLowerCase())
    }

    /**
     * Uppercase First letter string from value.
     * @return {Stringable}
     */
    ucfirst() {
        return new Stringable(this.value[0].toUpperCase() + this.substr(1))
    }

    /**
     * TitleCase string from value.
     * @return {Stringable}
     */
    title() {
        let string = this.value.valueOf().split(" ");
        for (let i = 0; i < string.length; i++) {
            string[i] = string[i].charAt(0).toUpperCase() + string[i].substring(1).toLowerCase();
        }
        return new Stringable(string.join(" "));
    }

    /**
     * CamelCase string from value.
     * @return {Stringable}
     */
    camel() {
        return new Stringable(
            this.value.toLowerCase().replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
        );
    }

    /**
     * SnakeCase string from value.
     * @return {Stringable}
     */
    snake() {
        return this.slug('_');
    }

    /**
     * KebabCase string from value.
     * @return {Stringable}
     */
    kebab() {
        return this.slug('-');
    }

    /**
     * Slug string from value.
     * @param separator {String}
     * @return {Stringable}
     */
    slug(separator = '-') {
        const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_-,:;'
        const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz'
        const p = new RegExp(a.split('').join('|'), 'g')
        return this
            .lower()
            .trim(separator)
            .replace('&', 'and') // Replace & with 'and'
            .replace(' ', separator)
            .replace(p, c => b.charAt(a.indexOf(c)) || separator) // Replace special characters;
    }

    /**
     * Conditional: String contains any?
     * @param needles {String}
     * @return {Boolean}
     */
    contains(...needles) {
        for (let index in needles) {
            if (this.value.includes(needles[index])) {
                return true;
            }
        }
        return false;
    }

    /**
     * Conditional: String contains all?
     * @param needles {String}
     * @return {Boolean}
     */
    containsAll(...needles) {
        for (let index in needles) {
            if (this.contains(needles[index]) === false) {
                return false;
            }
        }
        return true;
    }

    /**
     * Conditional: String is exactly?
     * @param value {String}
     * @return {Boolean}
     */
    exactly(value) {
        return this.value === value;
    }

    /**
     * Explode value to string array.
     * @param delimiter {String}
     * @param limit {Number}
     * @return {string[]}
     */
    explode(delimiter, limit = Number.MAX_SAFE_INTEGER) {
        return this.value.split(delimiter).slice(0, limit - 1);
    }

    /**
     * Conditional: String matches other string.
     * @param value {String}
     * @return {Boolean}
     */
    is(value) {
        return this.exactly(value instanceof Stringable ? value.toString() : value);
    }

    /**
     * Conditional: Is Any String
     * @param values ...{String}
     * @return {Boolean}
     */
    isAny(...values) {
        for (let value in values) {
            if (this.is(values[value])) {
                return true;
            }
        }
        return false;
    }

    /**
     * Conditional: Is Empty String
     * @return {Boolean}
     */
    isEmpty() {
        return this.emptyValues.includes(this.value);
    }

    /**
     * Get Empty Values
     * @return {string[]}
     */
    get emptyValues(){
        return ['', null, undefined];
    }

    /**
     * Value as string length
     * @return {Number}
     */
    length() {
        return this.value.length;
    }
}