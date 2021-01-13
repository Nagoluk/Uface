import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import {getProfileThunkCreator, ProfileType, putUserDataThunkCreator} from "../../Redux/profileReducer";
import {AppStateType} from "../../Redux/stateRedux";

import LoginHoc from "../../hoc/loginHoc";

import Setting from "./setting";
import Preloader from "../assets/preloader/Preloader";


type MapDispatchToPropsType = {
    getProfileThunkCreator: (id: number | null) => any
    putUserDataThunkCreator: (data: ProfileType | null) => any
}

type MapStateToPropsType = {
    profile: ProfileType | null,
    id: number | null
    isUploadProfile: boolean
    isLogined: boolean
}

type OwnPropsType = {

}

export type SettingPropsType = MapDispatchToPropsType & MapStateToPropsType

class SettingContainer extends React.Component<SettingPropsType>{
    componentDidMount() {
        document.title = "Setting";
        if(this.props.profile === null || this.props.profile.userId !== this.props.id) {
            this.props.getProfileThunkCreator(this.props.id);
        }
    }

    render() {

        if(this.props.profile === null) return <Preloader/>

        return(<Setting
                    getProfileThunkCreator={this.props.getProfileThunkCreator}
                    putUserDataThunkCreator={this.props.putUserDataThunkCreator}
                    isLogined={this.props.isLogined}
                    isUploadProfile={this.props.isUploadProfile}
                    id={this.props.id}
                    profile={this.props.profile}

        />)
    }
}

let mapStateToProps = (state: AppStateType):MapStateToPropsType => {
    return {
        // state: state.SetLang,
        profile: state.ProfilePage.profile,
        id: state.LoginReducer.id,
        isUploadProfile: state.ProfilePage.isUploadProfile,
        isLogined: state.LoginReducer.isLogined
    }

}

export default compose(
    connect(mapStateToProps, {putUserDataThunkCreator, getProfileThunkCreator}),
    LoginHoc

)(SettingContainer)

