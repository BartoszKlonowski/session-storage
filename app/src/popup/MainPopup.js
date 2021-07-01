function listenForClicks() {
    document.addEventListener("click", () => {});
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
