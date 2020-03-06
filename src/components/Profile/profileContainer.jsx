import React from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {setProfile} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";

import {getProfileThunkCreator, updateStatusThunkCreator, getStatusThunkCreator} from "../../Redux/profileReducer";
//import LoginHoc from "../../hoc/loginHoc";


class ProfileContainer extends React.Component{
    
    componentDidMount() {

        let userID = this.props.match.params.userID || 6108;

        console.log(this.props);
      

        this.props.getProfileThunkCreator(userID);
        this.props.getStatusThunkCreator(userID);

       
    }

    render() {

        return (
           <Profile {...this.props} profile={this.props.profile} lang={this.props.setLang} status={this.props.status} updateStatusThunkCreator={this.props.updateStatusThunkCreator}/>
        );
    }
}

let mapStateToProps = (state) => (
    {profile: state.ProfilePage.profile,
    setLang: state.SetLang,
    isLogined: state.LoginReducer.isLogined,
    status: state.ProfilePage.status
});

//let isLogined = LoginHoc(ProfileContainer);
let AddURLdate = withRouter(ProfileContainer);

export default connect (mapStateToProps, {setProfile, getProfileThunkCreator, updateStatusThunkCreator, getStatusThunkCreator})(AddURLdate);