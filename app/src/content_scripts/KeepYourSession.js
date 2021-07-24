import Content from "./Content";

(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    browser.runtime.onMessage.addListener((message) => {
        const content = new Content(message.command, message.session);
        console.log(`Forwarding message: ${message}`);
        browser.runtime.sendMessage(message)
            .then((result) => {
                console.log(`${result.response}`);
            });
        console.log(`Forwarded.`);
        console.log(content);
    });
})();
