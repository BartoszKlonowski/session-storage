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
            status: "none",
        };
    }

    componentDidMount() {
        document.addEventListener("click", (event) => {
            event.preventDefault();
            const session = logic.getSessionNameFromInput(document);
            browser.tabs
                .query({active: true, currentWindow: true})
                .then((tabs) => {
                    logic.handleEventForGivenTab(browser, tabs, event, session);
                    this.setState({status: "success"});
                })
                .catch((error) => {
                    logic.reportError(error);
                    this.setState({status: "error"});
                });
        });
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
                <StatusWidget status={this.state.status}/>
            </form>
        );
    }
}

ReactDOM.render(<MainPopup />, document.getElementById("root"));
