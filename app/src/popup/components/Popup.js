import * as React from "react";
import ExpandedSessionListInput from "./ExpandedSessionListInput";
import ActionButton from "./ActionButton";

export class Popup extends React.Component {
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
