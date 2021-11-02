import * as logic from "./MainPopupLogic";
import * as React from "react";
import ReactDOM from "react-dom";
import ExpandedSessionListInput from "./components/ExpandedSessionListInput";
import ActionButton from "./components/ActionButton";

export class MainPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extensionName: "Session Storage",
        };
    }

    render() {
        return (
            <div id="popup-content">
                <div className="panel-plugin-name">
                    <a href="https://github.com/BartoszKlonowski/session-storage">{this.state.extensionName}</a>
                </div>

                <form id="mainForm">
                    <div className="panel-session-name">
                        <ExpandedSessionListInput />
                    </div>
                    <div className="panel-actions">
                        <ActionButton name="saveButton" text="SAVE" icon="glyphicon glyphicon-floppy-disk" />
                        <ActionButton name="deleteButton" text="DELETE" icon="glyphicon glyphicon-trash" />
                        <ActionButton name="reopenButton" text="REOPEN" icon="glyphicon glyphicon-refresh" />
                    </div>
                </form>
            </div>
        );
    }
}

logic.listenForClicks(document, browser);
ReactDOM.render(<MainPopup />, document.getElementById("root"));
