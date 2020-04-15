import React from "react";
import Dialog from "./Dialog";
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {getDialogsThunkCreator, getMessagesThunkCreator, sendMessagesThunkCreator} from "../../../Redux/messageReducer";
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

                return <Dialog userData={userData}
                               dialogId={+this.props.match.params.userID}
                               sendMessagesThunkCreator={this.props.sendMessagesThunkCreator}
                               id={this.props.id}
                />
        }

        return <Preloader/>
    }
}

let mapStateToProps = state => {
    return {
        dialogs: state.MessagePage.dialogs,
        id: state.LoginReducer.id,
        isDialogsFetching: state.MessagePage.isDialogsFetching
    }
}

export default connect(mapStateToProps, {getMessagesThunkCreator, getDialogsThunkCreator, sendMessagesThunkCreator})(withRouter(DialogContainer));

