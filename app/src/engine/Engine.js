import Database from "./Database";

class Engine {
    constructor(browser) {
        this.browser = browser;
        this.db = new Database();
    }

    pullAllOpenedTabs() {
        return this.browser.tabs.query({currentWindow: true});
    }

    saveSession(session, name) {
        const dbArray = this.sessionToDatabaseArray(session);
        this.db.saveSession(name, dbArray);
    }

    deleteSession(session, name) {
        const dbArray = this.sessionToDatabaseArray(session);
        for (let tab in dbArray) {
            browser.notifications.create({
                type: "basic",
                iconUrl: "",
                title: `delete: ${name}, length: ${dbArray.length}`,
                message: `${JSON.stringify(dbArray[tab])}`,
            });
        }
    }

    reopenSession(session, name) {
        const dbArray = this.sessionToDatabaseArray(session);
        for (let tab in dbArray) {
            browser.notifications.create({
                type: "basic",
                iconUrl: "",
                title: `reopen: ${name}, length: ${dbArray.length}`,
                message: `${JSON.stringify(dbArray[tab])}`,
            });
        }
    }

    isSessionNameCorrect(name) {
        const sessionName = String(name);
        return sessionName.length !== 0;
    }

    sessionToDatabaseArray(session) {
        let dbArray = [];
        for (let tab in session) {
            dbArray.push(this.mdnTabToDatabaseTabObject(session[tab]));
        }
        return dbArray;
    }

    mdnTabToDatabaseTabObject(mdnTabObject) {
        const dbTab = {
            active: mdnTabObject.active,
            hidden: mdnTabObject.hidden,
            highlighted: mdnTabObject.highlighted,
            incognito: mdnTabObject.incognito,
            index: mdnTabObject.index,
            isArticle: mdnTabObject.isArticle,
            isInReaderMode: mdnTabObject.isInReaderMode,
            lastAccessed: mdnTabObject.lastAccessed,
            pinned: mdnTabObject.pinned,
            windowId: mdnTabObject.windowId,
            url: mdnTabObject.url,
        };
        return dbTab;
    }
}

export default Engine;
