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

function saveInDatabase(sessionName, sessionData) {
    const newSession = {sessionName: sessionName, sessionObject: sessionData};
    let transaction = databaseHandler.transaction("sessionDB", "readwrite");
    let request = transaction.objectStore("sessionDB").add(newSession);

    request.onsuccess = () => {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `OK!`,
            message: `Written new entry to database IDB`,
        });
    };
    transaction.oncomplete = () => {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `OK!`,
            message: `Transaction completed`,
        });
    };
    transaction.onerror = () => {
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `ERROR!`,
            message: `Could not write new entry to database IDB`,
        });
    };
};

function loadFromDatabase(sessionName) {
    let objectStore = databaseHandler.transaction("sessionDB").objectStore("sessionDB");
    objectStore.openCursor().onsuccess = (arg) => {
        let cursor = arg.target.result;
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `DATA:`,
            message: `${cursor.value.sessionName}, ${cursor.value.sessionObject}`,
        });
        cursor.continue();
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
                    saveInDatabase();
                    break;
                case "delete":
                    correct = engine.deleteSession(allTabs, message.session);
                    break;
                case "reopen":
                    correct = engine.reopenSession(allTabs, message.session);
                    loadFromDatabase();
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
