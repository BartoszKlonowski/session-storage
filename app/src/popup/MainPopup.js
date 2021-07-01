function listenForClicks() {

    function reportError(error) {
        console.error(`Could not handle the click due to: ${error}`);
    }

    function sendMessageToEngineListener(tabs, message) {
        browser.tabs.sendMessage(tabs[0].id, {
            command: message
        });
    }

    document.addEventListener("click", (event) => {
        if (event.target.id === "saveButton") {
            browser.tabs.query({active: true, currentWindow: true})
                .then((tabs) => {sendMessageToEngineListener(tabs, "save")})
                .catch(reportError);
        }
        else if (event.target.id === "deleteButton") {
            browser.tabs.query({active: true, currentWindow: true})
                .then((tabs) => {sendMessageToEngineListener(tabs, "delete")})
                .catch(reportError);
        }
        else if (event.target.id === "reopenButton") {
            browser.tabs.query({active: true, currentWindow: true})
                .then((tabs) => {sendMessageToEngineListener(tabs, "reopen")})
                .catch(reportError);
        }
    });
}


function reportExecuteScriptError(error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute content script: ${error.message}`);
}

/**
 * When the popup loads, inject a content script into the active tab,
 * and add a click handler.
 * If we couldn't inject the script, handle the error.
 */
browser.tabs
    .executeScript({file: "../content_scripts/KeepYourSession.js"})
    .then(listenForClicks)
    .catch(reportExecuteScriptError);
