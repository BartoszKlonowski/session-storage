import React from "react";

export class Logo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel-plugin-name">
                <a href="https://github.com/BartoszKlonowski/session-storage">{this.props.extensionName}</a>
            </div>
        );
    }
}

export default Logo;
