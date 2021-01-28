import React from 'react';
import { connect } from 'react-redux';
import Header from "./header";
import {loginThunkCreator, logout} from "../../redux-state/loginReducer";
import {getNewMessageCountThunkCreator} from "../../redux-state/notificationReducer";
import {AppStateType} from "../../redux-state/stateRedux";
import {ProfileType} from "../../redux-state/profileReducer";
import {actionsApp} from "../../redux-state/appReducer";


type MapStateToPropsType = {
    isLogined: boolean
    email: string | null
    login: string | null
    newMessageCount: string | number
    profile: ProfileType | null
}

type MapDispatchToPropsType = {
    loginThunkCreator: () => any
    logout: () => any
    getNewMessageCountThunkCreator: () => any
    ChangeThemeAC: ()=> void
}

type OwnPropsType = {
    black: boolean
}

export type HeaderProps = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType

class HeaderContainer extends React.Component<HeaderProps> {

    render(){
        return (
            <Header {...this.props}/>
        );
    }
}



let mapStateToProps = (state: AppStateType) => {
    return {
        isLogined: state.LoginReducer.isLogined,
        email: state.LoginReducer.email,
        login: state.LoginReducer.login,
        newMessageCount: state.notification.newMessageCount,
        profile: state.LoginReducer.profile,
    }
}

let Dispatch = {
    loginThunkCreator,
    logout,
    getNewMessageCountThunkCreator,
    ...actionsApp
}

export default connect(mapStateToProps, Dispatch)(HeaderContainer);