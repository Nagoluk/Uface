import React from "react";
import Dialog from "./Dialog";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";

class DialogContainer extends React.Component {
    componentDidMount() {

    }

    render (){
        return <Dialog {...this.props}/>
    }
}

let mapStateToProps = state => {
    return {
        messagesData: state.MessagePage.messages
    }
}

export default connect(mapStateToProps)(withRouter(DialogContainer));

