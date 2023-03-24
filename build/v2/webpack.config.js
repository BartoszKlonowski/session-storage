const path = require("path");

module.exports = {
    entry: {
        "src/popup/MainPopup": "./build/v2/app/src/popup/MainPopup.js",
        "src/engine/Background": "./build/v2/app/src/engine/Background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "app"),
    },
};
