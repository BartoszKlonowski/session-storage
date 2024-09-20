import React from "react";
import {translate} from "../../engine/i18n";
import DefaultIcon from "../icons/save-default.png";
import HighlightedIcon from "../icons/save-highlighted.png";

export class ActionButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isMouseOver: false,
        };
    }

    render() {
        return (
            <button
                type="submit"
                title={translate(this.props.text.toLowerCase())}
                id={this.props.name}
                onMouseEnter={() => this.setState({isMouseOver: true})}
                onMouseLeave={() => this.setState({isMouseOver: false})}>
                <img
                    src={this.state.isMouseOver ? HighlightedIcon : DefaultIcon}
                    alt={this.props.name}
                    height={25}
                    width={25}
                />
                <div className="center-container">{translate(this.props.text.toLowerCase())} </div>
            </button>
        );
    }
}

export default ActionButton;
