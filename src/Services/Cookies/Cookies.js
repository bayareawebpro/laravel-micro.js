export default class Cookies {
	/**
	 * Config Service
     * @url https://github.com/jonschlinkert/set-value
	 **/
	constructor(app) {
        this.config = app.make('$config').toConfig('cookies')
        this.cookies = document.cookie.split('; ').reduce((prev, current) => {
            const [name, value] = current.split('=');
            prev = prev || {}
            prev[`${name}`] = value;
            return prev
        }, {})
	}
    has(key){
        return this.cookies.hasOwnProperty(key)
    }
    get secure(){
	    return this.config.get('secure', false) ? 'Secure' : ''
    }
    get sameSite(){
	    const value = this.config.get('sameSite', false)
	    return value ? `SameSite=${value}` : ''
    }
    get configString(){
	    return [
            `Domain=${this.config.get('domain', window.location.hostname)}`,
            `Path=${this.config.get('path', '/')}`,
            this.sameSite,
            this.secure,
        ].join(';')
    }

	/**
	 * Get Cookie Value
	 * @return {*}
	 **/
	get(key, fallback = null){
        return this.cookies[key] || fallback
	}

	/**
	 * Set Cookie Value
     * @param key {String}
     * @param value {*}
     * @param days {Number|Boolean}
	 * @return void
	 **/
	set(key, value, days = 1){
        const time = new Date();
        time.setTime(time.getTime() + (days*24*60*60*1000))
        const cookie = `${key}=${value};Expires=${time.toUTCString()};${this.configString}`
        console.log(`Cookies: Stored (${cookie})`)
        document.cookie = cookie
	}

    /**
     * Set Cookie Value
     * @param key {String}
     * @return void
     **/
    forget(key){
        console.log(`Cookies: Forgetting (${key})...`)
        document.cookie = `${key}=false; Max-Age=-99999999;${this.configString}`;
    }

}
