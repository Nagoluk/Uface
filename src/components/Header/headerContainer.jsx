import React from 'react';
import { connect } from 'react-redux';
import Header from "./header";
import {loginThunkCreator, logout} from "../../Redux/loginReducer";
import {getNewMessageCountThunkCreator} from "../../Redux/notificationReducer";
import {ChangeThemeAC} from "../../Redux/appReducer";


class HeaderContainer extends React.Component {

    render(){
        return (
            <Header {...this.props}/>
        );
    }
}



let mapStateToProps = (state) => {
    return {
        isLogined: state.LoginReducer.isLogined,
        email: state.LoginReducer.email,
        login: state.LoginReducer.login,
        newMessageCount: state.notification.newMessageCount

    }
}

let Dispatch = {
    loginThunkCreator,
    logout,
    getNewMessageCountThunkCreator,
    ChangeThemeAC
}

export default connect(mapStateToProps, Dispatch)(HeaderContainer);