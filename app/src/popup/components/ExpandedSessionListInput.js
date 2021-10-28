import React from "react";
import Database from "../../engine/Database";

export class ExpandedSessionListInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sessions: []
        };
    }

    componentDidMount() {
        const storage = new Database();
    }

    render() {
        return(
            <>
            </>
        );
    }
}

export default ExpandedSessionListInput;
