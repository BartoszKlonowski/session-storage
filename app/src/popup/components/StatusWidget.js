import React from "react";
import { CSSTransition } from "react-transition-group";

export class StatusWidget extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "none",
        }
    }

    componentDidMount() {
        console.log("status is: ", this.props.status);
        this.setState({status: this.props.status});
    }

    render() {
        return(
            <CSSTransition in={this.props.status === "success"} timeout={2000} classNames={"status-widget"}>
                <div className={"status-widget"}>
                </div>
            </CSSTransition>
        );
    }
}
