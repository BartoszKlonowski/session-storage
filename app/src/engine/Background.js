import Engine from "./Engine";
import Database from "./Database";

let databaseHandler;
const databaseSchemaVersionNumber = 1;

window.onload = () => {
    const db = new Database(window);
    db.open(databaseSchemaVersionNumber)
        .then((db) => {
            databaseHandler = db;
            databaseHandler;
        })
        .catch(() => {
            console.log("ERROR: Could not create or load a database!");
        });
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
                    correct = engine.deleteSession(message.session);
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
