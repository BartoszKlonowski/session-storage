import * as React from "react";
import ExpandedSessionListInput from "./ExpandedSessionListInput";
import ActionButton from "./ActionButton";
import FileButton from "./FileButton";
import Database from "../../engine/Database";
import {translate} from "../../engine/i18n";

export class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extensionName: "Session Storage",
            saveButtonTitle: "SAVE",
            buttonContainerWidth: 100,
            sessionExists: false,
            inputEmpty: true,
        };

        this.onTextInputChange = this.onTextInputChange.bind(this);
    }

    componentDidMount() {
        const buttonsTitles = [
            translate("overwrite").length,
            translate("save").length,
            translate("reopen").length,
            translate("delete").length,
        ];
        const theLongestTitle = Math.max(...buttonsTitles.values());
        this.setState({buttonContainerWidth: theLongestTitle * 10 + 25});
    }

    onTextInputChange(newValue) {
        const db = new Database();
        this.setState({inputEmpty: !newValue});
        db.loadSessions((sessions) => {
            const sessionExists = sessions.includes(newValue);
            const buttonTitle = sessionExists ? "OVERWRITE" : "SAVE";
            this.setState({saveButtonTitle: buttonTitle, sessionExists: sessionExists});
        });
    }

    render() {
        return (
            <form id="mainForm">
                <ExpandedSessionListInput onTextInputChange={this.onTextInputChange} />
                <div className="panel-actions" style={{width: `${this.state.buttonContainerWidth}px`}}>
                    <ActionButton
                        name="saveButton"
                        text={this.state.saveButtonTitle}
                        icon="save"
                        disabled={this.state.inputEmpty}
                    />
                    <ActionButton
                        name="deleteButton"
                        text="DELETE"
                        icon="delete"
                        disabled={!this.state.sessionExists}
                    />
                    <ActionButton
                        name="reopenButton"
                        text="REOPEN"
                        icon="reopen"
                        disabled={!this.state.sessionExists}
                    />
                    <div className="import-export-container">
                        <FileButton name="fromOpenButton" text="FROMOPEN" icon="from-file" disabled={false} />
                        <FileButton name="toOpenButton" text="TOOPEN" icon="to-file" disabled={false} />
                    </div>
                </div>
            </form>
        );
    }
}
