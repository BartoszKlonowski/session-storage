import React from "react";

export class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderVariantButton() {
        return (
            <button type="submit" className={`${this.props.buttonType}`} title={this.props.text} id={this.props.name}>
                {this.props.children}
            </button>
        );
    }

    renderDefaultButton() {
        return (
            <button type="submit" title={this.props.text} id={this.props.name}>
                {this.props.children}
            </button>
        );
    }

    render() {
        return this.props.buttonType ? this.renderVariantButton() : this.renderDefaultButton();
    }
}

export default Button;
