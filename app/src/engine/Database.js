class Database {
    constructor(window) {
        this.window = window;
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
}

export default Database;
