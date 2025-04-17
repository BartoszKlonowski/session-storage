import * as logic from "./MainPopupLogic";
import * as React from "react";
import {createRoot} from "react-dom/client";
import {Popup} from "./components/Popup";

if (!browser) {
    var browser = require("webextension-polyfill");
}

logic.listenForClicks(document, browser);

const root = createRoot(document.getElementById("root"));
root.render(<Popup />);
