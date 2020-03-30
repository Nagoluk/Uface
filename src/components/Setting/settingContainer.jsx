import React from 'react';
import Setting from "./setting";
import {connect} from "react-redux";
import {getProfileThunkCreator, putUserDataThunkCreator} from "../../Redux/profileReducer";
import {compose} from "redux";
import LoginHoc from "../../hoc/loginHoc";
import Preloader from "../assets/preloader/Preloader";


class SettingContainer extends React.Component{
    componentDidMount() {
        if(this.props.profile === null || this.props.profile.id !== this.props.id) {
            this.props.getProfileThunkCreator(this.props.id);
        }
    }

    render() {

        if(this.props.profile === null) return <Preloader {...this.props}/>

        return(<Setting {...this.props}/>)
    }
}

let mapStateToProps = (state) => {
    return {
        state: state.SetLang,
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

