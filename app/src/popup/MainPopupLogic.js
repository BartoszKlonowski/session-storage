export function buttonIdToCommandMessage(buttonId) {
    switch (buttonId) {
        case "saveButton":
            return "save";
        case "deleteButton":
            return "delete";
        case "reopenButton":
            return "reopen";
        case "fromOpenButton":
            return "from";
        case "toOpenButton":
            return "to";
        default:
            return "unknown";
    }
}

export function reportError(error) {
    console.error(`Could not handle the click due to: ${error}`);
}

export function sendMessageToEngineListener(browser, tabs, action, sessionName) {
    const command = {command: action, session: sessionName};
    browser.runtime.sendMessage(command);
    return command;
}

export function handleEventForGivenTab(browser, tabs, event, session) {
    const commandMessage = buttonIdToCommandMessage(event.target.id);
    sendMessageToEngineListener(browser, tabs, commandMessage, session);
}

export function getSessionNameFromInput(document) {
    const sessionNameInput = document.getElementsByClassName("session-name-input")[0];
    return sessionNameInput ? sessionNameInput.value : "";
}

export function listenForClicks(document, browser) {
    document.addEventListener("click", (event) => {
        const session = getSessionNameFromInput(document);
        browser.tabs
            .query({active: true, currentWindow: true})
            .then((tabs) => handleEventForGivenTab(browser, tabs, event, session))
            .catch((error) => reportError(error));
    });
}

export function reportExecuteScriptError(document, error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute content script: ${error.message}`);
}
