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
                    break;
                case "delete":
                    correct = engine.deleteSession(message.session);
                    break;
                case "reopen":
                    correct = engine.reopenSession(message.session);
                    break;
                default:
                    throw {message: `Unrecognized action from ${JSON.stringify(sender)}`};
            }
            if (correct === true) {
                sendResponse();
            }
        })
        .catch((error) => {
            console.log("engine.pullAllOpenTabs.error: ", error);
            throw error;
        });
});
