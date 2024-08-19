import * as logic from "./MainPopupLogic";
import * as React from "react";
import ReactDOM from "react-dom";
import {Popup} from "./components/Popup";

if (!browser) {
    var browser = require("webextension-polyfill");
}

logic.listenForClicks(document, browser);
ReactDOM.render(<Popup />, document.getElementById("root"));
