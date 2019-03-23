/**
 * Default Collection Attributes.
 * @const DefaultCollection
 * @return {{
 * sort: string,
 * order_by: string,
 * per_page: number,
 * current_page: number,
 * last_page: number,
 * total: number,
 * from: number,
 * to: number,
 * data: Array,
 * per_page_options: number[]
 * }}
 */
const DefaultCollection = () => {
    return {
        sort: 'desc',
        order_by: 'id',
        per_page: 15,
        current_page: 0,
        last_page: 1,
        total: 0,
        from: 1,
        to: 1,
        data: [],
        per_page_options: [1, 3, 5, 10, 15, 20, 30, 40, 50, 75, 100],
        pagination_delta: 2
    }
}

/**
 * Collection Class
 * Laravel Paginator Compatible Schema
 */
class Collection {
    /**
     * Class Constructor
     * @param state @type {{}|DefaultCollection}
     */
    constructor(state = {}) {
        this.state = Object.assign({}, DefaultCollection(), state)
        this.defaultState = state
    }

    /**
     * (Getter) pagination Links
     * @return {Array}
     */
    get pagination() {
        return this._buildLinks(this.get('current_page'), this.get('last_page'), this.get('pagination_delta'))
    }

    /**
     * (Getter) urlParams
     * @return {String}
     */
    get urlParams() {
        return `paginate=${this.perPage}&page=${this.currentPage}&orderBy=${this.orderBy}&sort=${this.sort}`
    }

    /**
     * (Getter) Get Items Count
     * @return {Number}
     */
    get itemCount() {
        return this.state.data.length
    }

    /**
     * (Getter) items
     * @return {Array}
     */
    get items() {
        return this.get('data')
    }

    /**
     * (Getter) hasItems
     * @return {Boolean}
     */
    get hasItems() {
        return this.items.length > 0
    }

    /**
     * (Getter) currentPage
     * @return {Number}
     */
    get currentPage() {
        return this.get('current_page')
    }

    /**
     * (Setter) currentPage
     * @param value @type {Number}
     * @return void
     */
    set currentPage(value) {
        this.set('current_page', value)
    }

    /**
     * (Getter) orderBy
     * @return {String}
     */
    get orderBy() {
        return this.get('order_by')
    }

    /**
     * (Setter) orderBy
     * @param value @type {String}
     * @return void
     */
    set orderBy(value) {
        this.set('order_by', value)
    }

    /**
     * (Getter) sort
     * @return {String}
     */
    get sort() {
        return this.get('sort')
    }

    /**
     * (Setter) sort
     * @param value @type {String}
     * @return void
     */
    set sort(value) {
        this.set('sort', value)
    }

    /**
     * (Getter) total
     * @return {Number}
     */
    get total() {
        return this.get('total')
    }

    /**
     * (Setter) total
     * @param value @type {Number}
     * @return void
     */
    set total(value) {
        this.set('total', value)
    }

    /**
     * (Getter) perPage
     * @return {Number}
     */
    get perPage() {
        return this.get('per_page')
    }

    /**
     * (Setter) sort
     * @param value @type {Number}
     * @return void
     */
    set perPage(value) {
        Object.assign(this.state, {
            per_page: this.perPageOptions.includes(value) ? value : 1,
            current_page: 1
        })
    }

    /**
     * (Getter) itemCount
     * @return {Number}
     */
    get perPageOptions() {
        return this.get('per_page_options')
    }

    /**
     * (Getter) hasPagination
     * @return {Boolean}
     */
    get hasPagination() {
        return this.get('last_page') > 1
    }

    /**
     * (Getter) shouldRenderLinks
     * @return {Boolean}
     */
    get shouldRenderLinks() {
        return this.pagination.includes(this.get('current_page'))
    }

    /**
     * (Getter) hasNextPage
     * @return {Boolean}
     */
    get hasNextPage() {
        return this.get('current_page') + 1 <= this.get('last_page')
    }

    /**
     * (Getter) hasPreviousPage
     * @return {Boolean}
     */
    get hasPreviousPage() {
        return this.get('current_page') - 1 >= 1
    }

    /**
     * (Method) Get Field Value
     * @param field @type {String}
     * @return {*}
     */
    get(field) {
        return this.state[field]
    }

    /**
     * (Method) Add Or Update
     * @param prop @type {String}
     * @param value @type {*}
     * @return {this}
     */
    addOrUpdate(prop = 'id', value) {
        if (this.firstWhere('id', value)) {
            this.update(value)
        } else {
            this.prepend(value)
        }
        return this
    }

    /**
     * (Method) Set Field
     * @param field @type {String}
     * @param value @type {*}
     * @return {this}
     */
    set(field, value) {
        this.state[field] = value
        return this
    }

    /**
     * (Method) State
     * @param state @type {{}}
     * @return void
     */
    setState(state) {
        this.state = Object.assign({}, this.state, state)
    }

    /**
     * (Method) flush State
     * @return void
     */
    flush() {
        this.state = Object.assign({}, DefaultCollection(), this.defaultState)
    }

    /**
     * (Method) Append Object
     * @param obj @type {{}}
     * @param dupes @type {Boolean}
     * @return {this}
     */
    append(obj, dupes = false) {
        if (!this.has(obj) || dupes) {
            this._removeOverflow()
            this.state.data.push(obj)
        }
        return this
    }

    /**
     * (Method) Prepend Object
     * @param obj @type {{}}
     * @param dupes @type {Boolean}
     * @return {this}
     */
    prepend(obj, dupes = false) {
        if (!this.has(obj) || dupes) {
            this._removeOverflow()
            this.state.data.unshift(obj)
        }
        return this
    }

    /**
     * (Internal) Remove Item Overflow
     * @return {this}
     */
    _removeOverflow() {
        if (this.hasItems && (this.itemCount + 1) > this.perPage) {
            this.remove(this.last())
        }
    }

    /**
     * (Method) Find Object by Property
     * @param obj @type {{*}}
     * @return {Boolean}
     */
    has(obj) {
        return this.state.data.indexOf(obj) >= 0
    }

    /**
     * (Method) Get First Item
     * @return {*}
     */
    first() {
        return this.hasItems ? this.items[0] : null
    }

    /**
     * (Method) Get First Item
     * @return {*}
     */
    last() {
        return this.hasItems ? this.items[this.itemCount - 1] : null
    }

    /**
     * (Method) Find First Object Where Condition
     * @param value @type {*}
     * @param prop @type {Number|String}
     * @return {*}
     */
    firstWhere(value, prop = 'id') {
        return this.state.data.find((entry) => entry[prop] === value[prop])
    }

    /**
     * (Method) Find Object by Property
     * @param value @type {*}
     * @param prop @type {String}
     * @return {*}
     */
    lastWhere(value, prop = 'id') {
        const items = this.where(prop, value)
        const last = items[items.length - 1]
        return last || null
    }

    /**
     * (Method) Find Objects Where Condition
     * @param value @type {*}
     * @param prop @type {String}
     * @return {*}
     */
    where(value, prop = 'id') {
        return this.state.data.filter((entry) => entry[prop] === value[prop])
    }

    /**
     * (Method) Find Objects WhereNot Condition
     * @param value @type {*}
     * @param prop @type {Number|String}
     * @return {*}
     */
    whereNot(value, prop = 'id') {
        return this.state.data.filter((entry) => entry[prop] !== value[prop])
    }

    /**
     * (Method) Update Object
     * @param value @type {*}
     * @param prop @type {String}
     * @return {this}
     */
    update(value, prop = 'id') {
        this.where(value, prop).forEach((entry) => Object.assign(entry, value))
        return this
    }

    /**
     * (Method) Append Object
     * @param prop @type {String}
     * @param value @type {*}
     * @return {this}
     */
    remove(prop = 'id', value) {
        const entries = this.where(prop, value)
        if (entries) {
            entries.forEach((entry) => this.state.data.splice(this.state.data.indexOf(entry), 1))
        }
        return this
    }

    /**
     * (Method) Append Object
     * @param entry @type {{*}}
     * @param obj @type {{*}}
     * @return {this}
     */
    replace(entry, obj) {
        this.state.data.splice(this.state.data.indexOf(entry), 1, obj)
        return this
    }

    /**
     * (Action) toggleSortable
     * @return void
     */
    toggleSortable(value) {
        if (this.isOrderedBy(value)) {
            if (this.isSorted('desc')) {
                this.set('sort', 'asc')
            } else {
                this.set('sort', 'desc')
            }
        } else {
            this.set('order_by', value)
            this.set('sort', 'desc')
        }
    }

    /**
     * (Action) toPreviousPage
     * @return void
     */
    previousPage() {
        this.page(this.get('current_page') - 1)
    }

    /**
     * (Action) toNextPage
     * @return void
     */
    nextPage() {
        this.page(this.get('current_page') + 1)
    }

    /**
     * (Action) page
     * @param value @type {Number}
     * @return void
     */
    page(value) {
        this.set('current_page', value)
    }

    /**
     * (Conditional Method) isCurrentPage
     * @param value @type {Number}
     * @return {Boolean}
     */
    isCurrentPage(value) {
        return this.get('current_page') === value
    }

    /**
     * (Conditional Method) isOrderedBy
     * @param value @type {Number}
     * @return {Boolean}
     */
    isOrderedBy(value) {
        return this.get('order_by') === value
    }

    /**
     * (Conditional Method) isSorted
     * @param value @type {Number}
     * @return {Boolean}
     */
    isSorted(value) {
        return this.get('sort') === value
    }

    /**
     * (Internal) buildLinks
     * @param currentPage @type {Number}
     * @param pageCount @type {Number}
     * @param delta @type {Number}
     * @return {Array}
     */
    _buildLinks(currentPage, pageCount, delta = 1) {
        let range = []
        for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
            range.push(i)
        }
        if (currentPage - delta > 2) {
            range.unshift("...")
        }
        if (currentPage + delta < pageCount - 1) {
            range.push("...")
        }
        range.unshift(1)
        range.push(pageCount)
        return range
    }
}

export default Collection
