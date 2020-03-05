import React from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {setProfile} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";

import {getProfileThunkCreator} from "../../Redux/profileReducer";
//import LoginHoc from "../../hoc/loginHoc";


class ProfileContainer extends React.Component{

    componentDidMount() {

        let userID = this.props.match.params.userID | 2;

    

        this.props.getProfileThunkCreator(userID);

    }

    render() {

        return (
           <Profile {...this.props} profile={this.props.profile} lang={this.props.setLang}/>
        );
    }
}

let mapStateToProps = (state) => (
    {profile: state.ProfilePage.profile,
    setLang: state.SetLang,
    isLogined: state.LoginReducer.isLogined});

//let isLogined = LoginHoc(ProfileContainer);
let AddURLdate = withRouter(ProfileContainer);

export default connect (mapStateToProps, {setProfile, getProfileThunkCreator})(AddURLdate);