import React from "react";

export class Logo extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="panel-plugin-name">
                <a href="https://github.com/BartoszKlonowski/session-storage" title="Click to visit GH Page">
                    {this.props.extensionName}
                </a>
            </div>
        );
    }
}

export default Logo;
