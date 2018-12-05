export default function(className){
 return `
    import ServiceProvider from "./Support/ServiceProvider"
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
         * Declare any dependencies that are required to be instantiated prior to boot.
         * @return {Array}
         */
        get dependencies() {
            return [
                '$otherService'
            ]
        }
    
        /**
         * Declare the aliases for the provided services
         * @return {Array}
         */
        get provides() {
            return [
                '$myService'
            ]
        }
    }
`
}
