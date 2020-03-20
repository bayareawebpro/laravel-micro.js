"use strict";
export default class Validator{
    constructor(){
        this.message = null
        this.exception = null
        this.messageBag = {}
    }

    /**
     * Make New Instance
     * @param data
     * @return Validator
     */
    make(data = {}){
        return new Validator(data)
    }

    /**
     * (Method) clearErrors
     * @return void
     */
    clear() {
        this.message = null
        this.exception = null
        this.messageBag = {}
    }

    /**
     * Sync State
     * @param data {Object}
     * @return Validator
     */
    sync(data) {
        this.exception = data.exception || null
        this.setMessage(data.message)
        this.setErrors(data.errors)
        return this
    }

    /**
     * Set Response Message
     * @param message {String}
     */
    setMessage(message){
        this.message = message
        return this
    }

    /**
     * Clear Response Message
     */
    clearMessage(){
        this.message = null
        return this
    }

    /**
     * Set Errors
     * @param messageBag
     */
    setErrors(messageBag){
        let messages = {}
        Object.keys(messageBag).forEach((field)=>{
            messageBag[field] = messageBag[field].map((value)=> value.replace(
                field.replace(/_/g, ' '),
                field.replace(/[._]/g, ' ')
            ))
        })
        this.messageBag = Object.assign({}, messageBag)
        return this
    }

    /**
     * (Method) Get First Error Entry
     * @return {String|null}
     */
    get firstEntry() {
        const errors = Object.values(this.messageBag).flat(2);
        return errors[0] || null
    }

    /**
     * In Invalid.
     * @return {boolean}
     */
    get isInvalid(){
        return Object.entries(this.messageBag).length > 0
    }

    /**
     * Put field Error message.
     * @param field {String}
     * @param error {String}
     * return this
     */
    put(field, error){
        if(Array.isArray(this.messageBag[field])){
            this.messageBag[field].push(error)
        }else{
            let errors = {}
            errors[field] = [error]
            this.setErrors(Object.assign({}, this.messageBag, errors))
        }
        return this
    }

    /**
     * Forget field Error message.
     * @param field {String}
     */
    forget(field){
        delete this.messageBag[field]
        this.messageBag = Object.assign({}, this.messageBag)
        return this
    }

    /**
     * Has Error for field.
     * @param field {String}
     * @return {boolean}
     */
    has(field) {
        return this.messageBag.hasOwnProperty(field)
    }

    /**
     * Get Error for field.
     * @param field {String}
     * @param fallback {*}
     * @return {*}
     */
    get(field, fallback = []) {
        if(this.messageBag[field]){
            return this.messageBag[field]
        }
        return fallback
    }

    /**
     * Get first Error for field.
     * @param field {String}
     * @param fallback {*}
     * @return {String|null}
     */
    first(field, fallback = false) {
        if(this.messageBag[field] && this.messageBag[field][0]){
            return this.messageBag[field][0]
        }
        return fallback || null
    }

    /**
     * Has Errors in fields.
     * @param fields {Array}
     * @return {Boolean}
     */
    hasAny(fields) {
        let hasErrors = false
        fields.some((field) => hasErrors = this.has(field))
        return hasErrors
    }

    /**
     * Get All Errors.
     * @return {Object}
     */
    all() {
        return this.messageBag
    }
}