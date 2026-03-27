import React from "react";

export class FileButton extends React.Component {
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
            <div
                className="inputWrapper"
                onMouseEnter={() => this.setState({isMouseOver: true})}
                onMouseLeave={() => this.setState({isMouseOver: false})}>
                <img
                    id={this.props.name}
                    src={this.state.isMouseOver ? this.IconHighlighted : this.IconDefault}
                    alt={this.props.name}
                    height={25}
                    width={25}
                />
                <input id={this.props.name} className="fileInput" type="file" name={this.props.name} />
            </div>
        );
    }
}

export default FileButton;
