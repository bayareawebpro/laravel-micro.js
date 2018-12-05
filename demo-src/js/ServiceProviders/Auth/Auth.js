export default class Auth {
    /**
     * Example Auth Service
     * (This is only an example, there's no services setup for this.)
     **/
    constructor(app) {
        this.app = app
        this.cookies = this.app.make('Cookies')
        this.store = this.app.make('Store')
        this.config = this.app.make('Config').toConfig('auth')
    }

    /**
     * Get Current User
     * @return Object|null
     **/
    get user(){
        return this.store.get('auth.user', null)
    }

    /**
     * Get LoggedIn Status
     * @return boolean
     **/
    get loggedIn(){
        return this.user !== null
    }

    /**
     * Get Cookie
     * @return boolean
     **/
    get cookie(){
        return this.cookies.get(this.config.get('cookie_name'), false)
    }

    /**
     * Get Authorization String
     * @return String|null
     **/
    get authorization(){
        if(this.cookie){
            return `Bearer ${this.cookie}`
        }
        return null
    }

    /**
     * Set Cookie
     * @return void
     **/
    setCookie(token){
        this.cookies.set(this.config.get('cookie_name'), token)
    }

    /**
     * Logout
     * @return void
     **/
    logout(){
        this.cookies.forget(this.config.get('cookie_name'))
        this.app.rebound('Store')
    }
}
