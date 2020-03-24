import React from 'react';
import Setting from "./setting";
import {connect} from "react-redux";
import {getProfileThunkCreator, putUserDataThunkCreator} from "../../Redux/profileReducer";


class SettingContainer extends React.Component{
    componentDidMount() {
        if(this.props.profile === null || this.props.profile.id !== this.props.id) {
            this.props.getProfileThunkCreator(this.props.id);
        }
    }

    render() {
        if(this.props.profile === null) return <h1>f</h1>

        return(<Setting {...this.props}/>)
    }
}

let mapStateToProps = (state) => {
    return {
        state: state.SetLang,
        profile: state.ProfilePage.profile,
        id: state.LoginReducer.id,
        isUploadProfile: state.ProfilePage.isUploadProfile
    }

}

export default connect(mapStateToProps, {putUserDataThunkCreator, getProfileThunkCreator})(SettingContainer)

