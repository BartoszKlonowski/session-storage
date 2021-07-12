class Content {
    constructor(command, session) {
        this.command = command;
        this.session = session;
    }

    getCommand() {
        return this.command;
    }

    getSession() {
        return this.session;
    }
}

export default Content;
