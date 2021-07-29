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
            message: `${session}`,
        });
    }

    deleteSession(session, name) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `delete: ${name}`,
            message: `${session}`,
        });
    }

    reopenSession(session, name) {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `reopen: ${name}`,
            message: `${session}`,
        });
    }

    isSessionNameCorrect(name) {
        const sessionName = String(name);
        return sessionName.length !== 0;
    }
}

export default Engine;
