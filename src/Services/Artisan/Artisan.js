import StubServiceProvider from './Stubs/ServiceProvider'
export default class Artisan {
    /**
     * Artisan Service
     * @url https://www.thatjsdude.com/jsConcepts/concepts/console.html
     **/
    constructor(App) {
        this.App = App
        window['Artisan'] = this
    }

    /**
     * Make Provider
     * @url https://www.thatjsdude.com/jsConcepts/concepts/console.html
     **/
    makeProvider(className){
        console.log(StubServiceProvider(className))
    }
}
