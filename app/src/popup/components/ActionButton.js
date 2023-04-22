import React from "react";
import {translate} from "../../engine/i18n";
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
                {translate(this.props.text.toLowerCase())}
            </Button>
        );
    }
}

export default ActionButton;
