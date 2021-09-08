class Engine {
    constructor(browser) {
        this.browser = browser;
    }

    pullAllOpenedTabs() {
        return this.browser.tabs.query({currentWindow: true});
    }

    saveSession(session, name, db) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `saveSession:`,
            message: `db is null: ${db === null} or db is undefined: ${db === undefined}`,
        });
        const dbArray = this.sessionToDatabaseArray(session);
        for (let tab of dbArray) {
            browser.notifications.create({
                type: "basic",
                iconUrl: "",
                title: `save: ${name}, length: ${dbArray.length}`,
                message: `${JSON.stringify(tab)}`,
            });
            db.save(name, tab);
        }
    }

    deleteSession(name, db) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `deleteSession:`,
            message: `db is null: ${db === null} or db is undefined: ${db === undefined}`,
        });
        db.delete(name);
    }

    reopenSession(name, db) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `reopenSession:`,
            message: `db is null: ${db === null} or db is undefined: ${db === undefined}`,
        });
        const dbArray = db.load(name);
        for (let tab of dbArray) {
            browser.notifications.create({
                type: "basic",
                iconUrl: "",
                title: `reopen: ${name}, length: ${dbArray.length}`,
                message: `${JSON.stringify(tab)}`,
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
