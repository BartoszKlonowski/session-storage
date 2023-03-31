const path = require("path");

module.exports = {
    entry: {
        "src/popup/MainPopup": "./platforms/chromium/app/src/popup/MainPopup.js",
        "src/engine/Background": "./platforms/chromium/app/src/engine/Background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "app"),
    },
};
