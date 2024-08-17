import * as React from "react";
import ExpandedSessionListInput from "./ExpandedSessionListInput";
import ActionButton from "./ActionButton";
import ExpandedSessionListInput from "./components/ExpandedSessionListInput";
import ActionButton from "./components/ActionButton";
import Database from "../engine/Database";

export class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extensionName: "Session Storage",
            selectedSession: "",
            saveButtonTitle: "",
        };

        this.onTextInputChange = this.onTextInputChange.bind(this);
        this.onSessionsLoad = this.onSessionsLoad.bind(this);
    }

    onSessionsLoad(sessions) {
        const buttonTitle = sessions.includes(this.state.selectedSession) ? "OVERWRITE" : "SAVE";
        this.setState({saveButtonTitle: buttonTitle});
    }

    onTextInputChange(newValue) {
        const db = new Database();
        this.setState({selectedSession: newValue});
        db.loadSessions(this.onSessionsLoad);
    }

    render() {
        return (
            <form id="mainForm">
                <ExpandedSessionListInput onTextInputChange={this.onTextInputChange} />
                <div className="panel-actions">
                    <ActionButton
                        name="saveButton"
                        text={this.state.saveButtonTitle}
                        icon="glyphicon glyphicon-floppy-disk"
                    />
                    <ActionButton name="deleteButton" text="DELETE" icon="glyphicon glyphicon-trash" />
                    <ActionButton name="reopenButton" text="REOPEN" icon="glyphicon glyphicon-refresh" />
                </div>
            </form>
        );
    }
}
