import Engine from "./Engine";

let databaseHandler;

window.onload = () => {
    let request = window.indexedDB.open("sessionDB", 1);
    request.onerror = () => {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `ERROR!`,
            message: `Could not load database IDB`,
        });
    };
    request.onsuccess = () => {
        databaseHandler = request.result;
    };
    request.onupgradeneeded = (arg) => {
        if (arg !== null) {
            databaseHandler = request.result.createObjectStore("sessionDB", {keyPath: "id", autoIncrement: true});
            databaseHandler.createIndex("sessionName", "sessionName", {unique: false});
            databaseHandler.createIndex("sessionObject", "sessionObject", {unique: false});
        }
    };
};

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const engine = new Engine(browser);
    engine
        .pullAllOpenedTabs()
        .then((allTabs) => {
            let correct = false;
            switch (message.command) {
                case "save":
                    correct = engine.saveSession(allTabs, message.session);
                    break;
                case "delete":
                    correct = engine.deleteSession(allTabs, message.session);
                    break;
                case "reopen":
                    correct = engine.reopenSession(allTabs, message.session);
                    break;
                default:
                    throw {message: `Unrecognized action from ${sender}`};
            }
            if (correct === true) {
                sendResponse();
            }
        })
        .catch((error) => {
            throw error;
        });
});
