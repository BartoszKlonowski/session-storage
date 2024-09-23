const path = require("path");

module.exports = {
    entry: {
        "src/popup/Main": "./platforms/mozilla/app/src/popup/Main.js",
        "src/engine/Background": "./platforms/mozilla/app/src/engine/Background.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "app"),
    },
    module: {
        rules: [
            {
                test: /\.(jpg|png|svg)$/,
                type: "asset/resource"
            },
        ]
    },
};
