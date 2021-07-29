const path = require("path");

module.exports = {
    entry: {
        "src/popup/MainPopup": "./build/src/popup/MainPopup.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build"),
    },
};
