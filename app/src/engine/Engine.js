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

    deleteSession(name) {
        this.db.deleteSession(name);
    }

    reopenSession(name) {
        const tabsArray = this.db.loadSession(name);
        for (let tab of tabsArray) {
            console.log("item in tabsArray: ", tab);
            browser.tabs.create(tab);
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
            index: mdnTabObject.index,
            pinned: mdnTabObject.pinned,
            windowId: mdnTabObject.windowId,
            url: mdnTabObject.url,
        };
        return dbTab;
    }
}

export default Engine;
