import React from "react";
import Database from "../../engine/Database";

export class ExpandedSessionListInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
            storage: new Database(),
        };
    }

    componentDidMount() {
        this.state.storage.loadSessions(sessions => this.setState({sessions: sessions}));
    }

    render() {
        let options = [];
        for (const sessionName of this.state.sessions) {
            options.push(<option value={sessionName}></option>);
        }
        return (
            <div className="panel-session-name">
                <input
                    title="Name of session"
                    list="allSessions"
                    aria-label={"session-name-input-field"}
                    aria-required="true"
                    type="text"
                    className="session-name-input"
                    onClick={() => {
                        this.state.storage.loadSessions(sessions => this.setState({sessions: sessions}))}
                    }
                    placeholder="..."
                />
                <datalist id="allSessions">{options}</datalist>
            </div>
        );
    }
}

export default ExpandedSessionListInput;
