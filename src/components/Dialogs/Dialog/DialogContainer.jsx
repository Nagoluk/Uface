import React from "react";
import Dialog from "./Dialog";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getMessagesThunkCreator} from "../../../Redux/messageReducer";

class DialogContainer extends React.Component {
    componentDidMount() {
        this.props.getMessagesThunkCreator(this.props.match.params.userID)
    }

    render (){
        let userData = this.props.dialogs.find(item =>{})

        return <Dialog {...this.props}/>
    }
}

let mapStateToProps = state => {
    return {
        messagesData: state.MessagePage.messages,
        dialogs: state.MessagePage.totalCount,
        id: state.LoginReducer.id
    }
}

export default connect(mapStateToProps, {getMessagesThunkCreator})(withRouter(DialogContainer));

