import Engine from "./Engine";

if (!browser) {
    var browser = require("webextension-polyfill");
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
    const engine = new Engine();
    engine
        .pullAllOpenedTabs()
        .then((allTabs) => {
            let correct = false;
            switch (message.command) {
                case "save":
                    correct = engine.saveSession(allTabs, message.session);
                    correct = true;
                    break;
                case "delete":
                    correct = engine.deleteSession(message.session);
                    correct = true;
                    break;
                case "reopen":
                    correct = engine.reopenSession(message.session);
                    correct = true;
                    break;
                case "from":
                    correct = engine.writeSessionsFromFile();
                    break;
                case "to":
                    correct = engine.writeSessionsToFile(message.session);
                    break;
                default:
                    throw {message: `Unrecognized action from ${JSON.stringify(sender)}`};
            }
            if (correct === true) {
                window.location.reload();
                sendResponse();
            }
        })
        .catch((error) => {
            console.log("engine.pullAllOpenTabs.error: ", error);
            throw error;
        });
});
