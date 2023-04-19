import React from "react";
import Database from "../../engine/Database";
import {SessionsList} from "./SessionsList";

export class ExpandedSessionListInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
            storage: new Database(),
            selectedSessionName: "",
            textInputID: "session-name-input",
        };

        this.onSelect = this.onSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        this.state.storage.loadSessions((sessions) => this.setState({sessions: sessions}));
    }

    onSelect(session) {
        this.setState({selectedSessionName: session});
    }

    onChange(event) {
        const newValue = event.target.value;
        this.setState({selectedSessionName: newValue});
    }

    onClick() {
        this.state.storage.loadSessions((sessions) => this.setState({sessions: sessions}));
        this.setState({selectedSessionName: ""});
    }

    render() {
        return (
            <div className="panel-session-name">
                <input
                    title="Name of session"
                    aria-label={"session-name-input-field"}
                    aria-required="true"
                    type="text"
                    autoComplete="off"
                    value={this.state.selectedSessionName}
                    id={this.state.textInputID}
                    className={this.state.textInputID}
                    onChange={this.onChange}
                    onClick={this.onClick}
                    placeholder="..."
                />
                <SessionsList
                    sessions={this.state.sessions}
                    selectedSession={this.state.selectedSessionName}
                    onSelect={(session) => {
                        this.onSelect(session);
                    }}
                />
            </div>
        );
    }
}

export default ExpandedSessionListInput;
