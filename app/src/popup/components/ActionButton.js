import React from "react";
import {translate} from "../../engine/i18n";
import Button from "./reusable/Button";

export class ActionButton extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Button text={translate(this.props.text.toLowerCase())} name={this.props.name}>
                <i id={this.props.name} className={this.props.icon}></i>
                {translate(this.props.text.toLowerCase())}
            </Button>
        );
    }
}

export default ActionButton;
