/**
 * Stringable Support
 * Contributor: Pablo Villalba
 * Refactoring: Daniel Alvidrez
 * @class Stringable
 */
export default class Stringable
{
    constructor(value) {
        this.value = String(value + '');
    }

    static of(value) {
        return new Stringable(value);
    }

    after(search) {
        return new Stringable(
            search === ''
                ? this.value
                : this.value.split(search).pop()
        );
    }

    append(...values) {
        return new Stringable(
            [this.value].concat(values).join('')
        );
    }

    before(search) {
        return new Stringable(
            search === ''
                ? this.value
                : this.value.split(search)[0]
        );
    }

    camel() {
        return new Stringable(
            this.value.replace(/\W+(.)/g, (match, chr) => chr.toUpperCase())
        );
    }

    contains(...needles) {
        for (let needle in needles) {
            if (this.value.includes(needle)) {
                return true;
            }
        }
        return false;
    }

    containsAll(...needles) {
        for (let needle in needles) {
            if (this.contains(needles[needle]) === false) {
                return false;
            }
        }
        return true;
    }

    exactly(value) {
        return this.value === value;
    }

    explode(delimiter, limit = Number.MAX_SAFE_INTEGER) {
        return this.value.split(delimiter).slice(0, limit - 1);
    }

    is(value) {
        return this.value === (value instanceof Stringable ? value.toString() : value);
    }

    isAny(...values) {
        for (let value in values) {
            if (this.is(values[value])) {
                return true;
            }
        }
        return false;
    }

    isAnySlug(...slugs) {
        for (let slug in slugs) {
            if (this.isSlug(slugs[slug])) {
                return true
            }
        }
        return false;
    }

    isSlug(value) {
        return this.slug().is(new Stringable(value).slug());
    }

    isEmpty() {
        return ['', null, undefined].includes(this.value);
    }

    kebab() {
        return this.slug('-');
    }

    length() {
        return this.value.length;
    }

    lower() {
        return new Stringable(this.value.toLowerCase());
    }

    notContains(...values) {
        return this.contains(values) === false;
    }

    prepend(...values) {
        return new Stringable(implode('', values) + this.value);
    }

    replace(search, replace) {
        return new Stringable(str_replace(search, replace, this.value));
    }

    slug(separator = '-') {
        return new Stringable(
            require('slug')(
                this.value,
                {lower:true, replacement: separator}
            )
        );
    }

    snake() {
        return this.slug('_');
    }

    substr(start, length = null) {
        return new Stringable(
            substr(this.value, start, length)
        );
    }

    title() {
        let string = this.value.valueOf().split(" ");

        for (let i = 0; i < string.length; i++) {
            string[i] = string[i].charAt(0).toUpperCase() + string[i].substring(1).toLowerCase();
        }

        return new Stringable(string.join(" "));
    }

    trim(...charlist) {
        return new Stringable(trim(this.value, charlist));
    }

    ltrim(...charlist) {
        return new Stringable(ltrim(this.value, charlist));
    }

    rtrim(...charlist) {
        return new Stringable(rtrim(this.value, charlist));
    }

    ucfirst() {
        return new Stringable(ucfirst(this.value));
    }

    upper() {
        return new Stringable(this.value.toUpperCase());
    }

    toString() {
        return this.value;
    }
}