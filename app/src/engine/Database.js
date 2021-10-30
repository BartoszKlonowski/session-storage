class Database {
    constructor() {
        this.instance = {};
        this.storage = window.localStorage;
    }

    initialize() {}

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

    saveSession(name, tabs) {
        if (this.isSessionCorrect(name, tabs) === true) {
            try {
                this.storage.setItem(name, `${JSON.stringify(tabs)}`);
                let allSessions = this.loadSessions();
                allSessions = this.addNewSessionNameToStorage(name, allSessions);
                this.saveSessions(allSessions);
            } catch (exception) {
                console.log(`ERROR: `, exception);
            }
        }
    }

    deleteSession(name) {
        try {
            this.storage.removeItem(name);
            let allSessions = this.loadSessions();
            allSessions = this.removeSessionNameFromStorage(name, allSessions);
            this.saveSessions(allSessions);
        } catch (exception) {
            console.log("ERROR: Could not remove the item. ", exception);
        }
    }

    loadSession(name) {
        try {
            const sessionData = this.storage.getItem(name);
            return JSON.parse(sessionData);
        } catch (exception) {
            console.log("ERROR: Could not read from database: ", exception);
        }
    }

    loadSessions() {
        const sessionsArray = this.storage.getItem("sessions");
        return JSON.parse(sessionsArray);
    }

    saveSessions(allSessionsArray) {
        this.storage.setItem("sessions", JSON.stringify(allSessionsArray));
    }

    save(sessionName, tabs) {
        if (this.isSessionCorrect(sessionName, tabs) === true) {
            const newSession = {sessionName: sessionName, sessionObject: tabs};
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
        return typeof sessionName === "string" && sessionData.length > 0;
    }

    addSessionNameToDbTabsObject(dbTabsObject, sessionName) {
        let sessionNameForDbObject = undefined;
        if (this.isSessionCorrect(sessionName, dbTabsObject) === true) {
            sessionNameForDbObject = sessionName;
        } else {
            console.log("ERROR: Incorrect session name given - returning undefined");
        }
        const dbObject = {
            sessionName: sessionNameForDbObject,
            sessionTabs: dbTabsObject,
        };
        return dbObject;
    }

    pushToLoadedDataIfSessionMatch(session, loadedData, item) {
        if (session === item.sessionName) {
            loadedData.push(item);
        }
    }

    addNewSessionNameToStorage(newSessionName, allSessions) {
        if (!allSessions) {
            return [newSessionName];
        }
        if (!this.sessionNameAlreadyExistsInStorage(newSessionName, allSessions)) {
            return [...allSessions, newSessionName];
        } else {
            return allSessions;
        }
    }

    removeSessionNameFromStorage(deletingSessionName, allSessions) {
        var index = allSessions.indexOf(deletingSessionName);
        if (index > -1) {
            allSessions.splice(index, 1);
        }
        return allSessions;
    }

    sessionNameAlreadyExistsInStorage(sessionName, allSessions) {
        if (allSessions && allSessions.length > 0) {
            return (
                allSessions?.find((session) => {
                    return session === sessionName;
                }) === sessionName
            );
        } else {
            return false;
        }
    }
}

export default Database;
