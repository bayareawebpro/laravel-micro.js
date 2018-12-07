export default class Console {
    /**
     * Console Service
     * @url https://www.thatjsdude.com/jsConcepts/concepts/console.html
     **/
    constructor(App) {
        this.App = App
        this.enabled = true
    }
    log(){
        if(!this.enabled) return
            window.console.log.apply(window.console, arguments)

    }
    warn(){
        if(!this.enabled) return
            window.console.warn.apply(window.console, arguments)

    }
    info(){
        if(!this.enabled) return
            window.console.info.apply(window.console, arguments)

    }
    error(){
        if(!this.enabled) return
            window.console.error.apply(window.console, arguments)

    }
    table(){
        if(!this.enabled) return
            window.console.table.apply(window.console, arguments)
    }

    getDomProperties(selector){
        if(!this.enabled) return
            window.console.dir($(selector))
    }

    monitorEvents(element, events = ['click', 'keyup', 'focus']){
        if(!this.enabled) return
            window.console.monitorEvents(element, events);
    }

    startProfile(name){
        if(!this.enabled) return
            window.console.profile(name);
    }
    endProfile(){
        if(!this.enabled) return
            window.console.profile(name);
    }

    startCount(){
        if(!this.enabled) return
            window.console.count();
    }

    endCount(){
        if(!this.enabled) return
            window.console.countReset();
    }

    startGroup(name, collapsed = true){
        if(!this.enabled) return
            const type = collapsed ? 'groupCollapsed' : 'group'
            window.console[type](name);
    }
    endGroup(){
        if(!this.enabled) return
            window.console.groupEnd()
    }
    startTimer(name){
        if(!this.enabled) return
            window.console.time(name);
    }

    endTimer(name){
        if(!this.enabled) return
            window.console.timeEnd(name);
    }
}
