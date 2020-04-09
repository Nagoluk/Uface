import React from "react";
import Dialog from "./Dialog";
import {withRouter} from "react-router-dom";

class DialogContainer extends React.Component {
    componentDidMount() {

    }

    render (){
        return <Dialog {...this.props}/>
    }
}

export default withRouter(DialogContainer);

