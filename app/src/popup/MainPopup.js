import * as logic from "./MainPopupLogic";
import * as React from "react";
import ReactDOM from "react-dom";

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
                        <input id="sessionNameInput" list="sessions" type="text" placeholder="..." autoFocus />
                        <datalist id="sessions"></datalist>
                    </div>
                    <div className="panel-actions">
                        <button type="submit" id="saveButton">
                            <i className="glyphicon glyphicon-floppy-disk"></i>
                        </button>
                        <button type="submit" id="deleteButton">
                            <i className="glyphicon glyphicon-trash"></i>
                        </button>
                        <button type="submit" id="reopenButton">
                            <i className="glyphicon glyphicon-refresh"></i>
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}

logic.listenForClicks(document, browser);
ReactDOM.render(<MainPopup />, document.getElementById("root"));
