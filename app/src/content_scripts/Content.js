class Content {
    constructor(command, session, browser) {
        this.command = command;
        this.session = session;
        this.browser = browser;
    }

    getCommand() {
        return this.command;
    }

    getSession() {
        return this.session;
    }
}

export default Content;
