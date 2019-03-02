export default class LazyService{
    constructor(App) {
        this.app = App
    }
    run(){
	    setTimeout(() => {
		    this.app.make('Events').$emit('app:toast', {
			    title: `Async Service Loaded`,
			    body: `Sweet, let's service some users!`,
			    timeout: 4000, // milliseconds
			    type: 'success'
		    })
	    }, 2000)
	    return this
    }
}