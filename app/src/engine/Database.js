class Database {
    constructor(window) {
        this.window = window;
    }

    openDatabase() {
        return new Promise((resolve, reject) => {
            let databaseHandle;
            let request = this.window.indexedDB.open("sessionDB", 1);
            request.onerror = () => {
                reject();
            };
            request.onsuccess = () => {
                resolve(request.result);
            };
            request.onupgradeneeded = (arg) => {
                databaseHandle = arg.target.result.createObjectStore("sessionDB", {keyPath: "id", autoIncrement: true});
                databaseHandle.createIndex("sessionName", "sessionName", {unique: false});
                databaseHandle.createIndex("sessionObject", "sessionObject", {unique: false});
                resolve(request.result);
            };
        });
    }
}

export default Database;
