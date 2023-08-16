import * as logic from "./MainPopupLogic";
import * as React from "react";
import {createRoot} from "react-dom/client";
import ExpandedSessionListInput from "./components/ExpandedSessionListInput";
import ActionButton from "./components/ActionButton";

if (!browser) {
    var browser = require("webextension-polyfill");
}

export class MainPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extensionName: "Session Storage",
        };
    }

    render() {
        return (
            <form id="mainForm">
                <ExpandedSessionListInput />
                <div className="panel-actions">
                    <ActionButton name="saveButton" text="SAVE" icon="glyphicon glyphicon-floppy-disk" />
                    <ActionButton name="deleteButton" text="DELETE" icon="glyphicon glyphicon-trash" />
                    <ActionButton name="reopenButton" text="REOPEN" icon="glyphicon glyphicon-refresh" />
                </div>
            </form>
        );
    }
}

logic.listenForClicks(document, browser);
const root = createRoot(document.getElementById("root"));
root.render(<MainPopup />);
