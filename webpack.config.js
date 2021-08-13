const path = require("path");

module.exports = {
    entry: {
        "src/popup/MainPopup": "./build/src/popup/MainPopup.js",
        "src/engine/Background": "./build/src/engine/Background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build"),
    },
};
