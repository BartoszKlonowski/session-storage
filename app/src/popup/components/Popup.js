import * as React from "react";
import ExpandedSessionListInput from "./ExpandedSessionListInput";
import ActionButton from "./ActionButton";
import Database from "../engine/Database";

export class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extensionName: "Session Storage",
            saveButtonTitle: "",
        };

        this.onTextInputChange = this.onTextInputChange.bind(this);
    }

    onTextInputChange(newValue) {
        const db = new Database();
        db.loadSessions((sessions) => {
            const buttonTitle = sessions.includes(newValue) ? "OVERWRITE" : "SAVE";
            this.setState({saveButtonTitle: buttonTitle});
        });
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
