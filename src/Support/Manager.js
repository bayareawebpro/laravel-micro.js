import Stringable from "./Stringable"

export default class Manager {

    /**
     * Manager Constructor
     * @param {Container} App
     */
    constructor(App) {
        this.container = App
        this.customCreators = {}
        this.drivers = {}
    }

    /**
     * Returns the default driver. This method is an emulation of an abstract method
     * @return {String}
     */
    getDefaultDriver() {
        throw new Error('Class "Manager" requires children classes to implement the method "getDefaultDriver"')
    }

    /**
     * Returns an instance of the selected driver
     * @param {*} driver
     * @returns {*}
     */
    driver(driver = null) {
        if (driver === null) {
            driver = this.getDefaultDriver()
        }

        if (driver === null) {
            throw new Error(
               `Unable to resolve NULL driver for ${this.constructor.name}.`
            )
        }

        if (!(driver in this.drivers)) {
            this.drivers[driver] = this.createDriver(driver)
        }

        return this.drivers[driver]
    }

    /**
     * Creates an instance of the selected driver
     * @param {*} driver
     * @returns {*}
     */
    createDriver(driver) {
        if (driver in this.customCreators) {
            return this.callCustomCreator(driver)
        }

        let method = 'create' + new Stringable(driver).studly().append('Driver').toString()

        let prototype = Object.getPrototypeOf(this)

        if (!(method in prototype) || typeof this[method] !== 'function') {
            throw new Error('Driver ' + driver + ' not supported.')
        }

        return this[method]()
    }

    /**
     * Return a custom-created instance of the selected driver
     * @param {*} driver
     * @returns {*}
     */
    callCustomCreator(driver) {
        return this.customCreators[driver](this.container)
    }

    /**
     * Add a custom driver
     * @param {*} driver
     * @param {Function} callback
     * @returns {Manager}
     */
    extend(driver, callback) {
        this.customCreators[driver] = callback
        return this
    }

    /**
     * Return the available drivers
     * @returns {Object}
     */
    getDrivers() {
        return this.drivers
    }
}
