import Content from "./Content";

(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    browser.runtime.onMessage.addListener((message) => {
        const content = new Content(message.command, message.session);
        console.log(content);
    });
})();
