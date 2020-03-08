import React from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {setProfile, addNewPostAC, getProfileThunkCreator, updateStatusThunkCreator, getStatusThunkCreator} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";
import LoginHoc from "../../hoc/loginHoc";


class ProfileContainer extends React.Component{
    
    componentDidMount() {

        let userID = this.props.match.params.userID || this.props.loginData.id;

        this.props.getProfileThunkCreator(userID);
        this.props.getStatusThunkCreator(userID);

       
    }

    render() {

        return (
           <Profile {...this.props} 
           profile={this.props.profile} 
           lang={this.props.setLang} 
           status={this.props.status} 
           updateStatusThunkCreator={this.props.updateStatusThunkCreator}
           loginData = {this.props.loginData}
           />
        );
    }
}

let mapStateToProps = (state) => (
    {profile: state.ProfilePage,
    setLang: state.SetLang,
    loginData: state.LoginReducer,
    isLogined: state.LoginReducer.isLogined,
    status: state.ProfilePage.status
});

let isLogined = LoginHoc(ProfileContainer);
let AddURLdate = withRouter(isLogined);

export default connect (mapStateToProps, {setProfile, getProfileThunkCreator, updateStatusThunkCreator, getStatusThunkCreator, addNewPostAC})(AddURLdate);