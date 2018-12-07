export default function(className){
 return `
    import {ServiceProvider} from "laravel-micro.js"
    export default class ${className}Provider extends ServiceProvider{
    
        constructor(app) {
            super(app)
        }
    
        /**
         * Register any application services
         * @return void
         */
        register() {
            // this.app.bind(alias, () => new ${className}(args))
            // this.app.bind(alias, concrete)
        }
    
        /**
         * Boot any application services
         * @return void
         */
        boot() {
            // const ${className} = this.app.make(alias)
            // ${className}.method()
        }
    
        /**
         * Declare the aliases for the provided services
         * @return {Array}
         */
        get provides() {
            return [
                'alias'
            ]
        }
    }
`
}
