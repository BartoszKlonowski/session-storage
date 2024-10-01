import React from "react";
import {translate} from "../../engine/i18n";

export class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMouseOver: false,
            iconsPath: "../icons/",
        };
    }

    IconDefault = require(`../icons/${this.props.icon}-default.png`);
    IconHighlighted = require(`../icons/${this.props.icon}-highlighted.png`);
    render() {
        return (
            <button
                type="submit"
                title={this.props.text}
                id={this.props.name}
                onMouseEnter={() => this.setState({isMouseOver: true})}
                onMouseLeave={() => this.setState({isMouseOver: false})}>
                <img
                    id={this.props.name}
                    src={this.state.isMouseOver ? this.IconHighlighted : this.IconDefault}
                    alt={this.props.name}
                    height={25}
                    width={25}
                />
                <div id={this.props.name} className="center-container">
                    {translate(this.props.text.toLowerCase())}
                </div>
            </button>
        );
    }
}

export default ActionButton;
