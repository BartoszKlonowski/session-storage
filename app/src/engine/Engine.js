class Engine {
    constructor(browser) {
        this.browser = browser;
    }

    pullAllOpenedTabs() {
        return this.browser.tabs.query({currentWindow: true});
    }

    saveSession(session, name) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `save: ${name}`,
            message: `session.length = ${session.length} ${JSON.stringify(session)}`,
        });
    }

    deleteSession(session, name) {
        for (let tab in session) {
            browser.notifications.create({
                type: "basic",
                iconUrl: "",
                title: `delete: ${name}`,
                message: `${JSON.stringify(this.mdnTabToDatabaseTabObject(session[tab]))}`,
            });
        }
    }

    reopenSession(session, name) {
        for (let tab in session) {
            browser.notifications.create({
                type: "basic",
                iconUrl: "",
                title: `reopen: ${name}`,
                message: `${JSON.stringify(this.mdnTabToDatabaseTabObject(tab))}`,
            });
        }
    }

    isSessionNameCorrect(name) {
        const sessionName = String(name);
        return sessionName.length !== 0;
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
