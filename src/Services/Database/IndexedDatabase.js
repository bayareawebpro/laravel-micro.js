export default class IndexedDatabase {
    /**
     * IndexedDatabase Service
     */
    constructor(app) {
        this.app = app
        this.connection = null
        this.database = null
    }

    connect(name){
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) {
                reject()
                window.alert("Your browser doesn't support a stable version of IndexedDB. This feature will not be available.")
            }
            this.connection = window.indexedDB.open(name);
            this.connection.onerror = (event) => {
                reject()
            }
            this.connection.onsuccess = (event) => {
                this.database = event.target.result
                resolve(this.database)
            }
        })
    }
}
