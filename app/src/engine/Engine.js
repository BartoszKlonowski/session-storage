import Database from "./Database";

if (!browser) {
    try {
        var browser = require("webextension-polyfill");
    } catch (error) {
        // eslint-disable-next-line no-redeclare
        var browser = {};
    }
}

class Engine {
    constructor() {
        this.db = new Database();
    }

    pullAllOpenedTabs() {
        return browser.tabs.query({currentWindow: true});
    }

    saveSession(session, name) {
        const dbArray = this.sessionToDatabaseArray(session);
        this.db.saveSession(name, dbArray);
    }

    deleteSession(name) {
        this.db.deleteSession(name);
    }

    reopenSession(name) {
        this.db.loadSession(name, (session) => {
            const defaultWindowId = browser.windows.WINDOW_ID_CURRENT;
            browser.windows
                .getCurrent()
                .then((thisWindow) => {
                    this.assignTabsToCurrentWindow(session, thisWindow.windowId, defaultWindowId);
                })
                .catch((error) => {
                    console.error("Could not fetch the current Window ID - assigning to default", error.message);
                    this.assignTabsToCurrentWindow(session, defaultWindowId, defaultWindowId);
                })
                .finally(() => {
                    for (let tab of session) {
                        browser.tabs.create(tab);
                    }
                });
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
