"use strict";

import Exception from "./Exceptions/Exception"
import PreventsReactivity from './Traits/PreventsReactivity'

export default class Container {

    constructor() {
        this._providers = {}
        this._bindings = {}
        this._resolved = {}
        this._injections = []
        this._shouldShare = []
        this._sharedWith = {}
        this._sharable = []
        this._debug = false
        this._errorHandler = null
        this.logOutput = []

        //Disable Reactive Watchers from Polluting Scopes.
        this._nonReactive(this, '_providers')
        this._nonReactive(this, '_bindings')
        this._nonReactive(this, '_injections')
        this._nonReactive(this, '_resolved')
        this._nonReactive(this, '_sharable')
        this._nonReactive(this, '_sharedWith')
        this._nonReactive(this, '_shouldShare')
        this._nonReactive(this, '_errorHandler')
    }

    get providers() {
        return this._providers
    }

    get bindings() {
        return this._bindings
    }

    get resolved() {
        return this._resolved
    }

    get sharable() {
        return this._sharable.filter((entry) => this.isBound(entry))
    }

    get sharedWith() {
        return this._sharedWith
    }

    /**
     * Get Reserved Words List
     * @return {string[]}
     */
    get reservedWords() {
        const reservedWords = Object.keys(this.bindings)
        Object.values(this.providers).forEach((provider) => {
            provider.provides
                .filter((service) => !reservedWords.includes(service))
                .forEach((service) => reservedWords.push(service))
        })
        return reservedWords
    }

    /**
     * Get Provider
     * @param className {String}
     * @return {*|null}
     */
    getProvider(className) {
        return this._providers[className] || null
    }

    /**
     * Toggle Debugging
     * @param state {Boolean}
     */
    debug(state = true) {
        this._debug = state
    }

    /**
     * Get Name
     * @param obj
     * @return {String|null}
     */
    getName(obj) {
        if(obj){
            const possible = {
                name: obj.name ? obj.name : null,
                proto: obj.prototype ? obj.prototype.name : null,
                construct: obj.constructor ? obj.constructor.name : null,
                type: typeof (obj) || null,
            }
            return possible.name || possible.proto || possible.construct || possible.type
        }
    }

    /**
     * Set Error Handler
     * @param Handler {*}
     * @return this
     */
    errorHandler(Handler) {
        this._errorHandler = new Handler(this)
        return this
    }

    /**
     * Handle Error with Registered Handler
     * @param error {Error|Exception}
     * @throws {Error|Exception}
     */
    handleError(error) {
        if (this._errorHandler && this.isCallable(this._errorHandler.handle)) {
            return this._errorHandler.handle(error)
        }
        throw error
    }

    /**
     * Is the Service Provider Registered?
     * @param name {String}
     * @return {Boolean}
     */
    isRegistered(name) {
        return this.isset(this._providers[name])
    }

    /**
     * Is the Binding Registered?
     * @param alias {String}
     * @return {Boolean}
     */
    isBound(alias) {
        return this.isset(this._bindings[alias])
    }

    /**
     * Is the Binding Resolved?
     * @param alias {String}
     * @return {Boolean}
     */
    isResolved(alias) {
        return this.isset(this.resolved[alias])
    }

    /**
     * Is Value Callable
     * @param value {*}
     * @return {Boolean}
     */
    isCallable(value) {
        return (typeof value === 'function')
    }

    /**
     * Is Binding a Concrete Object / Primitive
     * @param alias {String}
     * @return {Boolean}
     */
    isConcrete(alias) {
        return !this.isCallable(this._bindings[alias])
    }

    /**
     * Is Binding a Class Constructor Type
     * @param abstract {String}
     * @return {Boolean}
     */
    isClass(abstract) {
        if (typeof abstract === 'string') {
            abstract = this._bindings[abstract]
        }
        return !this.isCallable(abstract) || this.isCallable(abstract) && this.getName(abstract) !== 'Function'
    }

    /**
     * Is the value set?
     * @param value {*}
     * @return {Boolean}
     */
    isset(value) {
        return ![null, undefined].includes(value)
    }

    /**
     * Make Instance
     * @param alias {String}
     * @return {*}
     */
    make(alias) {
        this.log(`Making "${alias}"...`)
        return this.resolve(alias)
    }

    /**
     * Build an Abstract
     * @param abstract
     * @return {*}
     */
    build(abstract) {
        return this.makeConcrete(abstract, this.prepareInjections(abstract))
    }

    /**
     * ReBuild Instance
     * @param alias {String}
     * @return {*}
     */
    rebound(alias) {
        this.log(`Rebound: "${alias}"...`)
        return this.resolve(alias, true)
    }

    /**
     * Get Instance
     * @param alias {String}
     * @return {*}
     */
    getInstance(alias) {
        this.log(`Resolved Shared Instance of "${alias}".`)
        return this.resolved[alias]
    }

    /**
     * Register Service Provider
     * @param ServiceProvider {ServiceProvider}
     * @return this
     */
    register(ServiceProvider) {
        const providerName = this.getName(ServiceProvider)
        this._providers[providerName] = new ServiceProvider(this)
        this.log(`Registered "${providerName}"...`)
        return this
    }

    /**
     * Bind Callable Concrete Instance.
     * @param alias {String}
     * @param binding {*}
     * @param shared {Boolean}
     * @return this
     */
    bind(alias, binding, shared = true) {
        this.log(`Binding: "${alias}"...`)
        this._bindings[alias] = binding
        if (shared && !this._sharable.includes(alias)) {
            this._sharable.push(alias)
        }
        return this
    }

    /**
     * Bind Alias of Abstract as Singleton (alias of bind)
     * Suggested By: https://github.com/Garanaw
     * @param alias {String}
     * @param abstract {*}
     * @return {Container}
     */
    singleton(alias, abstract){
        return this.bind(alias, abstract, true)
    }

    /**
     * Bind Alias of Abstract as Factory (alias of bind)
     * @param alias {String}
     * @param abstract {*}
     * @return {Container}
     */
    factory(alias, abstract){
        return this.bind(alias, abstract, false)
    }

    /**
     * UnBind & DestroyConcrete Instances.
     * @param alias {String}
     * @return this
     */
    unBind(alias) {
        this.log(`UnBinding: "${alias}"...`)
        this.destroy(alias)
        this.destroyReference(alias, this._bindings)
        if (this._sharable.includes(alias)) {
            this._sharable.splice(this._sharable.indexOf(alias), 1)
        }
        return this
    }

    /**
     * Set Concrete Instance
     * @param alias {String}
     * @param concrete {*}
     * @param shared {Boolean}
     * @return {*}
     */
    setInstance(alias, concrete, shared = true) {
        this.log(`Set Instance of "${alias}".`, concrete)
        this.resolved[alias] = concrete
        if (shared && !this._sharable.includes(alias)) {
            this._sharable.push(alias)
        }
        return concrete
    }

    /**
     * Destroy Resolved Instance
     * @param alias {String}
     * @return {Boolean}
     */
    destroy(alias) {
        if (this.isResolved(alias)) {
            this.unShare(alias)
            this.log(`Destroying shared instance of "${alias}"...`)
            this.destroyReference(alias, this.resolved)
            this.log(`"${alias}" was destroyed successfully.`)
            return true
        }
        return false
    }

    /**
     * Boot Providers
     * @return void
     */
    bootProviders() {
        //Register all bindings.
        const providers = Object.keys(this._providers)
        providers.forEach((providerName) => {
            this.log(`Calling "${providerName}" Registration...`)
            this._providers[providerName].register()
        })
        providers.forEach((providerName) => {
            const providerInstance = this._providers[providerName]
            if (!providerInstance.isDeferred) {
                this.bootProvider(providerInstance)
            }
        })
    }

    /**
     * Boot Service Provider
     * @param ProviderInstance {ServiceProvider}
     * @return void
     */
    bootProvider(ProviderInstance) {
        this.log(`Calling "${this.getName(ProviderInstance)}" Boot...`)
        return ProviderInstance.load()
    }


    /**
     * Find Service Provider
     * @param alias {String}
     * @return {*|null}
     */
    findProvider(alias) {
        this.log(`Checking Provider for "${alias}"...`)
        const providers = Object.values(this._providers)
        const result = providers.find((providerInstance) => providerInstance.provides.includes(alias))
        if (result) {
            this.log(`Located Provider for "${alias}"...`)
        }
        return result
    }

    /**
     * Resolve Binding
     * @param alias {String}
     * @param rebound {Boolean}
     * @return {*}
     */
    resolve(alias, rebound = false) {
        if (this.isResolved(alias) && this.canShare(alias) && !rebound) {
            return this.getInstance(alias)
        }
        if (rebound) {
            this.destroy(alias)
        }
        if (!this.isBound(alias)) {
            return this.handleError(this.makeException('Binding Exception', `No Binding found for "${alias}".`))
        }
        const providerInstance = this.findProvider(alias)
        if (providerInstance && providerInstance.isDeferred) {
            this.log(`Booting Deferred ServiceProvider "${alias}"...`)
            this.bootProvider(providerInstance)
        }
        const instance = this.resolveIfNotResolved(alias)
        if (this.canShare(alias)) {
            this.log(`"${alias}" is Sharable.`)
            this.setInstance(alias, instance)
        }
        return instance
    }

    /**
     * (pass-through) Resolve if not resolved.
     * @param alias {*}
     * @return {*}
     */
    resolveIfNotResolved(alias) {
        this.log(`Resolving Binding for "${alias}"...`)
        const binding = this._bindings[alias]
        if (this.isCallable(binding)) {
            return this.build(binding)
        }
        return binding
    }

    /**
     * (pass-through) Make Concrete Instance
     * @param binding {*}
     * @param injections {Array}
     * @return {*}
     */
    makeConcrete(binding, injections) {
        try {
            const construct = Object.create(binding.constructor).bind.apply(binding, [null].concat(injections))
            let concrete
            if (!this.isClass(binding)) {
                concrete = construct()
            } else {
                concrete = new construct
            }
            if (typeof concrete === 'undefined') {
                return this.makeException('Binding Exception', `Binding ${binding} failed, return value is undefined.`)
            }
            this.log(`Instantiated Concrete Instance of "${this.getName(concrete)}" successfully.`)
            return concrete
        } catch (e) {
            return this.handleError(e)
        }
    }

    /**
     * Prepare Dependencies
     * @param instance {*}
     * @return {Array}
     */
    prepareInjections(instance) {
        const injections = []
        if (this.isCallable(instance)) {
            const dependencies = this.readArguments(instance)
            const alias = this.getName(instance)
            if (dependencies && dependencies.length) {
                dependencies.forEach((dependency) => {
                    if (this._injections.includes(dependency)) {
                        throw this.makeException('Circular Dependency Exception',
                            `"${alias}" requires ${this._injections.join(', ')}`
                        )
                    }
                    this.log(`"${alias}" requires dependency "${dependency}"`)
                    this._injections.push(dependency)
                    injections.push(this.resolve(dependency))
                    this._injections.splice(this._injections.indexOf(dependency), 1)
                })
            }
        }
        return injections
    }

    /**
     * Destroy a Shared Reference
     * @param alias {String}
     * @param obj {Object}
     * @return void
     */
    destroyReference(alias, obj) {
        if (obj[alias]) {
            this.log(`Cleaning up resolved reference of "${alias}"...`)
            obj[alias] = null
            delete obj[alias]
        }
    }

    /**
     * Read Arguments
     * Matches everything inside the function argument parens.
     * Split the arguments string into an array comma delimited.
     * Inline comments are skipped and whitespace is trimmed.
     * Undefined values are filtered.
     * @param callable {Function}
     * @return {*}
     */
    readArguments(callable) {
        const args = callable.toString().match(/function.*?\(([^)]*)\)/)
        if (args && args[1]) {
            return args[1].split(',').map((arg) => arg.trim()).filter((arg) => arg)
        }
        return []
    }

    /**
     * Collect Sharable Aliases (method chain)
     * @param aliases {String|Array}
     * @return {this}
     */
    share(...aliases) {
        this._shouldShare = []
        aliases.forEach((alias, index) => {
            if (!this.isBound(alias)) {
                return this.handleError(this.makeException(`No binding for ${alias} available to share.`))
            }
            if (!this.canShare(alias)) {
                return this.handleError(this.makeException(`${alias} is not sharable.`))
            }
            if (!this._shouldShare.includes(alias)) {
                this._shouldShare.push(alias)
            }
        })
        return this
    }

    /**
     * Attach Sharable Alias to Objects  (method chain end)
     * @param instances {*}
     * @return this
     */
    withOthers(...instances) {
        if (Array.isArray(this._shouldShare) && this._shouldShare.length > 0) {
            this._shouldShare.forEach((alias) => {
                instances.forEach((object) => {
                    const sharedList = (this._sharedWith[alias] ? this._sharedWith[alias] : this._sharedWith[alias] = [])
                    if (!sharedList.includes(object)) {
                        object[this.getSharedAliasName(alias)] = (() => this.make(alias))
                        sharedList.push(object)
                    }
                })
            })
            this.log(`Shared "${this._shouldShare.join(', ')}" with ${instances.length} Objects.`)
        }
        this._shouldShare = []
        return this
    }

    /**
     * Get Shared Alias Name from Normal Name
     * @param alias {String}
     * @return {String}
     */
    getSharedAliasName(alias) {
        return `$${alias[0].toLowerCase() + alias.substring(1)}`
    }

    /**
     * Is the Service Shared?.
     * @param alias {String}
     * @return {Boolean}
     */
    isShared(alias) {
        return (this._sharedWith.hasOwnProperty(alias) && this._sharedWith[alias].length > 0)
    }

    /**
     * UnShare a Shared Service.
     * @param alias {String}
     * @return this
     */
    unShare(alias) {
        this.log(`UnSharing "${alias}"...`)
        if (!this._sharedWith[alias]) return this
        this._sharedWith[alias].forEach((object) => {
            this.log(`Destroying shared references of "${alias}"...`)
            this.destroyReference(this.getSharedAliasName(alias), object)
        })
        delete this._sharedWith[alias]
        return this
    }

    /**
     * Can Share Instance
     * @param alias {String}
     * @return {Boolean}
     */
    canShare(alias) {
        return this._sharable.includes(alias)
    }

    /**
     * Record Log
     * @return this
     */
    log() {
        if (this._debug) {
            console.debug.apply(console, arguments)
            this.logOutput.push(arguments[0])
        }
        return this
    }

    /**
     * Flush Logs
     * @return this
     */
    flushLogs() {
        this.logOutput = []
        return this
    }

    /**
     * Make New Exception
     * @param name {String}
     * @param args {String}
     * @return {Exception}
     */
    makeException(name, ...args) {
        const e = new Exception(...args)
        e.name = `${this.getName(this)} ${name}`
        return e
    }
}
/** Container Traits **/
PreventsReactivity(Container)