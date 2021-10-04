class Database {
    constructor(window) {
        this.window = window;
        this.instance = {};
        this.storage = window.localStorage;
    }

    open(dbNumber) {
        return new Promise((resolve, reject) => {
            const currentSchema = this.getSchema(this.dbNumberToSchemaIndex(dbNumber));
            let databaseHandle;
            let request = this.window.indexedDB.open("sessionDB", 1);
            request.onerror = () => {
                reject();
            };
            request.onsuccess = () => {
                this.instance = request.result;
                resolve(request.result);
            };
            request.onupgradeneeded = (arg) => {
                databaseHandle = arg.target.result.createObjectStore("sessionDB", {
                    keyPath: currentSchema.keyPath,
                    autoIncrement: currentSchema.autoIncrement,
                });
                databaseHandle.createIndex(currentSchema.sessionName, currentSchema.sessionName, {
                    unique: currentSchema.sessionNameUnique,
                });
                databaseHandle.createIndex(currentSchema.sessionObject, currentSchema.sessionObject, {
                    unique: currentSchema.sessionObjectUnique,
                });
                resolve(request.result);
            };
        });
    }

    save(sessionName, tab) {
        if (this.isSessionCorrect(sessionName, tab) === true) {
            const newSession = {sessionName: sessionName, sessionObject: tab};
            let transaction = this.instance.transaction("sessionDB", "readwrite");
            transaction.objectStore("sessionDB").add(newSession);
            transaction.onerror = () => {
                console.log("ERROR: Could not write to database - entry did not saved!");
            };
        } else {
            console.log("ERROR: Incorrect session - could not write to database!");
        }
    }

    load(sessionName) {
        let sessionTabs = [];
        let objectStore = this.instance.transaction("sessionDB").objectStore("sessionDB");
        objectStore.openCursor().onsuccess = (arg) => {
            let cursor = arg.target.result;
            this.pushToLoadedDataIfSessionMatch(sessionName, sessionTabs, cursor.value);
            cursor.continue();
        };
        return sessionTabs;
    }

    delete(sessionName) {
        try {
            let transaction = this.instance.transaction("sessionDB", "readwrite");
            transaction.objectStore("sessionDB").delete(sessionName);
        } catch (exception) {
            browser.notifications.create({
                type: "basic",
                iconUrl: "",
                title: `EXCEPTION:`,
                message: `${exception.message}`,
            });
        }
    }

    getSchema(schemaId) {
        const schemas = [
            {
                keyPath: "id",
                autoIncrement: true,
                sessionName: "sessionName",
                sessionNameUnique: false,
                sessionObject: "sessionObject",
                sessionObjectUnique: false,
                id: 1,
            },
        ];
        return schemas[schemaId];
    }

    dbNumberToSchemaIndex(dbNumber) {
        return dbNumber > 0 ? dbNumber - 1 : 0;
    }

    isSessionCorrect(sessionName, sessionData) {
        return typeof sessionName === "string" && sessionData instanceof Object;
    }

    pushToLoadedDataIfSessionMatch(session, loadedData, item) {
        if (session === item.sessionName) {
            loadedData.push(item);
        }
    }
}

export default Database;
