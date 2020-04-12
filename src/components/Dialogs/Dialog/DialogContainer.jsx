import React from "react";
import Dialog from "./Dialog";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getDialogsThunkCreator, getMessagesThunkCreator} from "../../../Redux/messageReducer";
import Preloader from "../../assets/preloader/Preloader";

class DialogContainer extends React.Component {

    componentDidMount() {
        this.props.getMessagesThunkCreator(this.props.match.params.userID);
        this.props.getDialogsThunkCreator();
    }

    render (){
        if(this.props.isDialogsFetching) return <Preloader/>

        let userData;
        if(this.props.dialogs !== null) {
            userData = this.props.dialogs.find(item => {
                return item.id === +this.props.match.params.userID
            })

                return <Dialog {...this.props} userData={userData}/>
        }

        return <Preloader/>
    }
}

let mapStateToProps = state => {
    return {
        messagesData: state.MessagePage.messages,
        dialogs: state.MessagePage.dialogs,
        id: state.LoginReducer.id,
        isDialogsFetching: state.MessagePage.isDialogsFetching
    }
}

export default connect(mapStateToProps, {getMessagesThunkCreator, getDialogsThunkCreator})(withRouter(DialogContainer));

