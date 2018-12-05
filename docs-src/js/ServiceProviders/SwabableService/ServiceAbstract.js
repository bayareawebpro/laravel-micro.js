import {PlucksProperties} from "laravel-micro.js"
export default class ServiceAbstract{
    constructor(){
        this._version = 'ServiceAbstract'
        this._persistant = ['_content']
        this._content = ''
    }
    getVersion(){
        return this._version
    }
    get content(){
        return this._content
    }
    set content(value){
        this._content = value
    }
    get state(){
        return this._pluck(this, this._persistant)
    }
    set state(state){
        Object.keys(state).forEach((key, index)=>{
            if(this._persistant.includes(key)){
                this[key] = state[key]
            }
        })
    }
}
PlucksProperties(ServiceAbstract)