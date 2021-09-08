class Database {
    constructor(window) {
        this.window = window;
        this.instance = {};
    }

    open(dbNumber) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `OPEN:`,
            message: `${dbNumber}`,
        });
        return new Promise((resolve, reject) => {
            const currentSchema = this.getSchema(this.dbNumberToSchemaIndex(dbNumber));
            let databaseHandle;
            let request = this.window.indexedDB.open("sessionDB", 1);
            request.onerror = () => {
                reject();
            };
            request.onsuccess = () => {
                this.instance = request.result;
                browser.notifications.create({
                    type: "basic",
                    iconUrl: "",
                    title: `request.onsuccess:`,
                    message: `${JSON.stringify(request.result)}`,
                });
                resolve(request.result);
            };
            request.onupgradeneeded = (arg) => {
                browser.notifications.create({
                    type: "basic",
                    iconUrl: "",
                    title: `request.onupgradeneeded:`,
                    message: `${JSON.stringify(arg)}`,
                });
                databaseHandle = arg.target.result.createObjectStore("sessionDB", {
                    keyPath: currentSchema.keyPath,
                    autoIncrement: currentSchema.autoIncrement,
                });
                browser.notifications.create({
                    type: "basic",
                    iconUrl: "",
                    title: `request.onupgradeneeded:`,
                    message: `${JSON.stringify(databaseHandle)}`,
                });
                window.alert(`${databaseHandle}`);
                databaseHandle.createIndex(currentSchema.sessionName, currentSchema.sessionName, {
                    unique: currentSchema.sessionNameUnique,
                });
                databaseHandle.createIndex(currentSchema.sessionObject, currentSchema.sessionObject, {
                    unique: currentSchema.sessionObjectUnique,
                });
                browser.notifications.create({
                    type: "basic",
                    iconUrl: "",
                    title: `request.onupgradeneeded:`,
                    message: `done - resolving promise`,
                });
                resolve(request.result);
            };
        });
    }

    close() {
        this.window.indexedDB.close();
    }

    save(sessionName, tab) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `save:`,
            message: `args: ${sessionName}, ${tab}`,
        });
        if (this.isSessionCorrect(sessionName, tab) === true) {
            const newSession = {sessionName: sessionName, sessionObject: tab};
            let transaction = this.instance.transaction("sessionDB", "readwrite");
            transaction.objectStore("sessionDB").add(newSession);
            transaction.onerror = () => {
                browser.notifications.create({
                    type: "basic",
                    iconUrl: "",
                    title: `save.onerror:`,
                    message: ``,
                });
            };
        } else {
            browser.notifications.create({
                type: "basic",
                iconUrl: "",
                title: `save:`,
                message: `sessionName invalid: ${sessionName}`,
            });
        }
    }

    load(sessionName) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `load: ${sessionName}:`,
            message: `${JSON.stringify(cursor.value)}`,
        });
        let sessionTabs = [];
        let objectStore = this.instance.transaction("sessionDB").objectStore("sessionDB");
        objectStore.openCursor().onsuccess = (arg) => {
            let cursor = arg.target.result;
            this.pushToLoadedDataIfSessionMatch(sessionName, sessionTabs, cursor.value);
            browser.notifications.create({
                type: "basic",
                iconUrl: "",
                title: `load: ${sessionName}:`,
                message: `${JSON.stringify(cursor.value)}`,
            });
            cursor.continue();
        };
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `load - returning:`,
            message: `sessionTabs: ${sessionTabs.length}`,
        });
        return sessionTabs;
    }

    delete(sessionName) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `DELETE:`,
            message: `${sessionName}`,
        });
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
