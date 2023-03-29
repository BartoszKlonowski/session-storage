if (!browser) {
    var browser = require("webextension-polyfill");
}

class Database {
    constructor() {
        this.storage = browser.storage.local;
    }

    saveSession(name, tabs) {
        if (this.isSessionCorrect(name, tabs) === true) {
            try {
                this.storage.set(JSON.parse(`{"${name}":${JSON.stringify(tabs)}}`));
                this.loadSessions().then(allSessions => {
                    allSessions = this.addNewSessionNameToStorage(name, allSessions);
                    this.saveSessions(allSessions);
                });
            } catch (exception) {
                console.log(`ERROR: `, exception);
            }
        }
    }

    deleteSession(name) {
        try {
            this.storage.remove(name);
            this.loadSessions((sessions) => {
                const updatedSessions = this.removeSessionNameFromStorage(name, sessions);
                this.saveSessions(updatedSessions);
            });
        } catch (exception) {
            console.log("ERROR: Could not remove the item. ", exception);
        }
    }

    loadSession(name, onComplete) {
        try {
            this.storage.get(name).then(session => {
                console.log("loadSession.session: ", session);
                onComplete(JSON.parse(session));
            }).catch();
        } catch (exception) {
            console.log("ERROR: Could not read from database: ", exception);
            onComplete({});
        }
    }

    loadSessions(onComplete) {
        this.storage.get("sessions").then(sessions => {
            if(sessions?.length) {
                console.log("loadSessions.success.sessions: ", JSON.stringify(sessions));
                onComplete(sessions);
            } else {
                console.log("loadSessions.error.sessions: ", JSON.stringify(sessions));
                onComplete([]);
            }
        }).catch(error => {
            console.log("loadSessions.error: ", error);
            onComplete([]);
        });
    }

    saveSessions(allSessionsArray) {
        this.storage.set({sessions: allSessionsArray}).catch(error => {
            console.warn("Database.v3.saveSessions.error: ", error);
        });
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
