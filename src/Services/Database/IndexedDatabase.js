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
        if (!window.indexedDB) {
            window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
        }
        this.connection = indexedDB.open(name);
        this.connection.onerror = function(event) {
            alert("Why didn't you allow my web app to use IndexedDB?!");
        };
        this.connection.onsuccess = function(event) {
            this.database = event.target.result;
        };
    }
}
