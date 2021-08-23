import Engine from "./Engine";
import Database from "./Database";

let databaseHandler;

window.onload = () => {
    const db = new Database(window, browser);
    db.openDatabase()
        .then((db) => {
            databaseHandler = db;
        })
        .catch(() => {
            console.log("ERROR: Could not create or load a database!");
        });
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
}

function loadFromDatabase() {
    let objectStore = databaseHandler.transaction("sessionDB").objectStore("sessionDB");
    objectStore.openCursor().onsuccess = (arg) => {
        let cursor = arg.target.result;
        browser.notifications.create({
            type: "basic",
            iconUrl: "",
            title: `DATA:`,
            message: `${JSON.stringify(cursor.value)}`,
        });
        cursor.continue();
    };
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const engine = new Engine(browser);
    engine
        .pullAllOpenedTabs()
        .then((allTabs) => {
            let correct = false;
            switch (message.command) {
                case "save":
                    correct = engine.saveSession(allTabs, message.session);
                    saveInDatabase("session", "example");
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
