if (!browser) {
    var browser = require("webextension-polyfill");
}

class Database {
    constructor() {
        browser.storage.local = browser.storage.local;
    }

    saveSession(name, tabs) {
        console.log("Database.saveSession.tabs: ", tabs);
        if (this.isSessionCorrect(name, tabs) === true) {
            try {
                browser.storage.local.set(JSON.parse(`{"${name}":${JSON.stringify(tabs)}}`)).catch(error => {
                    console.log("browser.storage.local.set.error: ", error);
                });
                this.loadSessions(allSessions => {
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
            browser.storage.local.remove(name);
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
            browser.storage.local.get(name).then(session => {
                console.log("loadSession.session: ", session);
                onComplete(session[name]);
            }).catch();
        } catch (exception) {
            console.log("ERROR: Could not read from database: ", exception);
            onComplete({});
        }
    }

    loadSessions(onComplete) {
        browser.storage.local.get("sessions").then(sessions => {
            if(sessions?.sessions?.length) {
                onComplete(sessions.sessions);
            } else {
                onComplete([]);
            }
        }).catch(error => {
            console.log("loadSessions.error: ", error);
            onComplete([]);
        });
    }

    saveSessions(allSessionsArray) {
        browser.storage.local.set({sessions: allSessionsArray}).catch(error => {
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
