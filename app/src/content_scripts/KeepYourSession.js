(function() {
    /**
     * Check and set a global guard variable.
     * If this content script is injected into the same page again,
     * it will do nothing next time.
     */
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    /**
     * Listen for messages from the background script.
     * Call "beastify()" or "reset()".
    */
    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "execute") {
            console.warn(`Received command: execute`);
        } else if (message.command === "reset") {
            console.error(`Failed to execute content script: No content implemented`);
        }
    });
})();
