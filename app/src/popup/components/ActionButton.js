import React from "react";

export class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <>
                <button type="submit" title={this.props.text} id={this.props.name}>
                    <i className={this.props.icon}></i>
                </button>
            </>
        );
    }
}

export default ActionButton;
