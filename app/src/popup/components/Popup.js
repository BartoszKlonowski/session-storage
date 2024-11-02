import * as React from "react";
import ExpandedSessionListInput from "./ExpandedSessionListInput";
import ActionButton from "./ActionButton";
import Database from "../../engine/Database";
import {translate} from "../../engine/i18n";

export class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extensionName: "Session Storage",
            saveButtonTitle: "SAVE",
            buttonContainerWidth: 100,
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
        db.loadSessions((sessions) => {
            const buttonTitle = sessions.includes(newValue) ? "OVERWRITE" : "SAVE";
            this.setState({saveButtonTitle: buttonTitle});
        });
    }

    render() {
        return (
            <form id="mainForm">
                <ExpandedSessionListInput onTextInputChange={this.onTextInputChange} />
                <div className="panel-actions" style={{width: `${this.state.buttonContainerWidth}px`}}>
                    <ActionButton name="saveButton" text={this.state.saveButtonTitle} icon="save" />
                    <ActionButton name="deleteButton" text="DELETE" icon="delete" />
                    <ActionButton name="reopenButton" text="REOPEN" icon="reopen" />
                </div>
            </form>
        );
    }
}
