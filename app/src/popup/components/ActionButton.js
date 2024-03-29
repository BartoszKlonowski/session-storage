import React from "react";
import {translate} from "../../engine/i18n";
import Button from "./reusable/Button";

export class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            translatedButtonText: translate(this.props.text.toLowerCase()),
        };
    }

    render() {
        return (
            <Button text={this.state.translatedButtonText} name={this.props.name}>
                <i id={this.props.name} className={this.props.icon}></i>
                {this.state.translatedButtonText}
            </Button>
        );
    }
}

export default ActionButton;
