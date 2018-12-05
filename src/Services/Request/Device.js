import PlucksProperties from "../../Traits/PlucksProperties"
export default class Device {
    /**
     * Device Service
     * @url https://blog.teamtreehouse.com/exploring-javascript-device-apis
     **/
    constructor() {
        this.geoPosition = null
    }

    get isOnline(){
        return window.navigator.onLine
    }

    get vendor(){
        return this._pluck(window.navigator, [
            'platform',
            'product'
        ])
    }

    get screen(){
        return {
            pixelDepth: window.screen.pixelDepth,
            height: window.screen.height,
            width: window.screen.width,
            innerHeight: window.innerHeight,
            innerWidth: window.innerWidth,
            pageXOffset: window.pageXOffset,
            pageYOffset: window.pageYOffset,
            status: window.status,
        }
    }

    getPosition(){
        return new Promise((resolve, reject)=>{
            window.navigator.geolocation.getCurrentPosition((position) => {
                resolve(this.geoPosition = position)
            }, (error)=>{
                reject(error)
            })
        })
    }

    watchPosition(){
        this._watchId = window.navigator
            .geolocation
            .watchPosition((position) => this.geoPosition = position)
    }

    unwatchPosition(){
        if(this._watchId){
            window.navigator.geolocation.clearWatch(this._watchId);
            this._watchId = null
            delete this._watchId
        }
    }
}
PlucksProperties(Device)



