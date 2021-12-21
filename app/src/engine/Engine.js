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
        const defaultWindowId = browser.windows.WINDOW_ID_CURRENT;
        browser.windows
            .getCurrent()
            .then((thisWindow) => {
                this.assignTabsToCurrentWindow(tabsArray, thisWindow.windowId, defaultWindowId);
            })
            .catch((error) => {
                console.error("Could not fetch the current Window ID - assigning to default", error.message);
                this.assignTabsToCurrentWindow(tabsArray, defaultWindowId, defaultWindowId);
            })
            .finally(() => {
                for (let tab of tabsArray) {
                    browser.tabs.create(tab);
                }
            });
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

    assignTabsToCurrentWindow(tabs, currentWindowId, defaultWindowId) {
        for (let tab of tabs) {
            tab.windowId = currentWindowId && currentWindowId > 0 ? currentWindowId : defaultWindowId;
        }
    }
}

export default Engine;
