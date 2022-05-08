import React from "react";
import Button from "./reusable/Button";

export class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Button text={this.props.text} name={this.props.name}>
                <i id={this.props.name} className={this.props.icon}></i>
                {this.props.text}
            </Button>
        );
    }
}

export default ActionButton;
