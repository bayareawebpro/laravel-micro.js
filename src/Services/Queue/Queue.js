export default class Queue {
    /**
     * Queue Service
     */
    constructor(app) {
        this.app = app
        this.register()
    }

    /**
     * Auth Service
     */
    register(className){

        if (navigator.serviceWorker) {
            console.log("Service Workers Supported")

            navigator.serviceWorker.register('worker.js', {
                scope: './'
            })
            .then((reg) => {
                console.log("Service Worker Started", reg);
            })
            .catch((error) => {
                console.log("Failed Registering Service Worker", error);
            })
        }
    }

    postMessage(message = 'Hello World!') {
        if (navigator.serviceWorker.controller) {
            console.log("Sending message to service worker")
            navigator.serviceWorker.controller.postMessage({
                command:'sayHello',
                message: message
            });
        } else {
            console.log("No Service Worker")
        }
    }
}
