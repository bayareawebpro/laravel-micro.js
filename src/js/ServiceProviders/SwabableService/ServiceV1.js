import ServiceAbstract from "./ServiceAbstract"
export default class Service_V1 extends ServiceAbstract{
    constructor(){
        super()
        this._version = 'Service_V1'
        this.fieldType = 'color'
        this.fieldLabel = 'Choose a color:'
    }
}