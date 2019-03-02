import {PlucksProperties} from "laravel-micro.js"
export default class ServiceAbstract{
    constructor(){
        this._version = 'ServiceAbstract'
        this._persistantFields = ['content']
        this.content = ''
    }
    getVersion(){
        return this._version
    }
    get state(){
        return this._pluck(this, this._persistantFields)
    }
    set state(state){
        Object.keys(state).forEach((key, index)=>{
            if(this._persistantFields.includes(key)){
                this[key] = state[key]
            }
        })
    }
}
PlucksProperties(ServiceAbstract)