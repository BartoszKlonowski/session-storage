(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "save") {
            console.warn(`Received command: execute`);
        } else if (message.command === "reset") {
            console.error(`Failed to execute content script: No content implemented`);
        }
    });
})();
