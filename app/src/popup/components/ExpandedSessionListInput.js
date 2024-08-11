import React from "react";
import Database from "../../engine/Database";
import {translate} from "../../engine/i18n";
import {SessionsList} from "./SessionsList";

export class ExpandedSessionListInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
            storage: new Database(),
            selectedSessionName: "",
            textInputID: "session-name-input",
            isCaseSensitive: false,
        };

        this.onSelect = this.onSelect.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onCaseSensitiveChange = this.onCaseSensitiveChange.bind(this);
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

    onCaseSensitiveChange() {
        const current = this.state.isCaseSensitive;
        this.setState({isCaseSensitive: !current});
    }

    render() {
        return (
            <div className="panel-session-name">
                <div className="panel-session-name-input-container">
                    <input
                        title={translate("session-tooltip")}
                        aria-label={"session-name-input-field"}
                        aria-required="true"
                        type="text"
                        autoComplete="off"
                        value={this.state.selectedSessionName}
                        id={this.state.textInputID}
                        className={this.state.textInputID}
                        onChange={this.onChange}
                        onClick={this.onClick}
                        placeholder={translate("session-placeholder")}
                    />
                    <div
                        onClick={this.onCaseSensitiveChange}
                        className={
                            this.state.isCaseSensitive
                                ? "session-search-entry-matchCase-selected"
                                : "session-search-entry-matchCase-unselected"
                        }>
                        Aa
                    </div>
                </div>
                <SessionsList
                    sessions={this.state.sessions}
                    caseSensitive={this.state.isCaseSensitive}
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
