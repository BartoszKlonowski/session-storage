const path = require("path");

module.exports = {
    entry: {
        "src/popup/MainPopup": "./platforms/mozilla/app/src/popup/MainPopup.js",
        "src/engine/Background": "./platforms/mozilla/app/src/engine/Background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "app"),
    },
};
