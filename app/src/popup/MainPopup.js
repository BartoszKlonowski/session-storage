import * as logic from "./MainPopupLogic";
import * as React from "react";
import ReactDOM from "react-dom";
import ExpandedSessionListInput from "./components/ExpandedSessionListInput";
import ActionButton from "./components/ActionButton";
import Logo from "./components/Logo";
import { StatusWidget } from "./components/StatusWidget";

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
                <Logo extensionName="Session Storage" />
                <ExpandedSessionListInput />
                <div className="panel-actions">
                    <ActionButton name="saveButton" text="SAVE" icon="glyphicon glyphicon-floppy-disk" />
                    <ActionButton name="deleteButton" text="DELETE" icon="glyphicon glyphicon-trash" />
                    <ActionButton name="reopenButton" text="REOPEN" icon="glyphicon glyphicon-refresh" />
                </div>
                <StatusWidget/>
            </form>
        );
    }
}

logic.listenForClicks(document, browser);
ReactDOM.render(<MainPopup />, document.getElementById("root"));
