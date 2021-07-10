export function buttonIdToCommandMessage(buttonId) {
    switch (buttonId) {
        case "saveButton":
            return "save";
        case "deleteButton":
            return "delete";
        case "reopenButton":
            return "reopen";
        default:
            return "unknown";
    }
}

export function reportError(error) {
    console.error(`Could not handle the click due to: ${error}`);
}

export function sendMessageToEngineListener(browser, tabs, message) {
    const command = {command: message};
    browser.tabs.sendMessage(tabs[0].id, command);
    return command;
}

export function handleEventForGivenTab(browser, tabs, event) {
    const commandMessage = buttonIdToCommandMessage(event.target.id);
    sendMessageToEngineListener(browser, tabs, commandMessage);
}

export function listenForClicks(document, browser) {
    document.addEventListener("click", (event) => {
        browser.tabs
            .query({active: true, currentWindow: true})
            .then((tabs) => handleEventForGivenTab(browser, tabs, event))
            .catch((error) => reportError(error));
    });
}

export function reportExecuteScriptError(document, error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute content script: ${error.message}`);
}
