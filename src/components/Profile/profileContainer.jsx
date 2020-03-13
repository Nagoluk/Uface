import React from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {setProfile, getProfileThunkCreator, updateStatusThunkCreator, getStatusThunkCreator} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";



class ProfileContainer extends React.Component{
    
    componentDidMount() {

        let userID = this.props.match.params.userID;

        if(!userID){
            userID = this.props.loginData.id;

            if(!userID) {
                this.props.history.push("/login")
                return
            }
        }

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

//let isLogined = LoginHoc(ProfileContainer);
let AddURLdate = withRouter(ProfileContainer);

export default connect (mapStateToProps, {setProfile, getProfileThunkCreator, updateStatusThunkCreator, getStatusThunkCreator})(AddURLdate);