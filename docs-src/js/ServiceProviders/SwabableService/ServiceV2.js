import ServiceAbstract from "./ServiceAbstract"
export default class Service_V2 extends ServiceAbstract{
    constructor(){
        super()
        this._version = 'Service_V2'
        this.fieldType = 'text'
        this.fieldLabel = 'Tell us your favorite color:'
    }
}