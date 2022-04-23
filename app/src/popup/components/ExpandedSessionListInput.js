import React from "react";
import Database from "../../engine/Database";

export class ExpandedSessionListInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: [],
        };
    }

    loadSessions = () => {
        const storage = new Database();
        this.setState({sessions: storage.loadSessions()});
    };

    componentDidMount() {
        this.loadSessions();
    }

    render() {
        let options = [];
        for (const sessionName of this.state.sessions) {
            options.push(<option value={sessionName}></option>);
        }
        return (
            <div className="panel-session-name">
                <input
                    list="allSessions"
                    type="text"
                    className="session-name-input"
                    onClick={this.loadSessions}
                    placeholder="..."
                />
                <datalist id="allSessions">{options}</datalist>
            </div>
        );
    }
}

export default ExpandedSessionListInput;
