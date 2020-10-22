import React from "react";
import Profile from "./profile";
import {connect} from "react-redux";
import {
    setProfile,
    getProfileThunkCreator,
    updateStatusThunkCreator,
    getStatusThunkCreator,
    uploadAvatarThunkCreator
} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";
import {setRedirectedToDialog, startChatingThunkCreator} from "../../Redux/messageReducer";
import {getFollowProccesSelector} from "../../Redux/usersSelectors";
import {followThunkCreator, searchingThunkCreator, unfollowThunkCreator} from "../../Redux/usersReducer";



class ProfileContainer extends React.Component{
    setProfile = () => {
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
    
    componentDidMount() {
        document.title = "Profile";
        this.setProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if( this.props.match.params.userID !== prevProps.match.params.userID) {
            this.setProfile()
        }
    }

    componentWillUnmount() {
        this.props.setRedirectedToDialog(false);
        this.props.setProfile(null);
    }

    render() {

        return (
           <Profile {...this.props}
                    isFollowed={this.props.isFollowed}
                    profile={this.props.profile}
                    lang={this.props.setLang}
                    status={this.props.status}
                    updateStatusThunkCreator={this.props.updateStatusThunkCreator}
                    loginData = {this.props.loginData}
                    uploadAvatarThunkCreator = {this.props.uploadAvatarThunkCreator}
                    startChatingThunkCreator = {this.props.startChatingThunkCreator}
                    isRedirectedToDialog = {this.props.isRedirectedToDialog}
                    followProcces = {this.props.followProcces}
                    searchingThunkCreator = {this.props.searchingThunkCreator}
                    followThunkCreator = {this.props.followThunkCreator}
                    unfollowThunkCreator = {this.props.unfollowThunkCreator}
           />
        );
    }
}

let mapStateToProps = (state) => (
    {profile: state.ProfilePage,
    setLang: state.SetLang,
    loginData: state.LoginReducer,
    isLogined: state.LoginReducer.isLogined,
    status: state.ProfilePage.status,
    isRedirectedToDialog: state.MessagePage.isRedirectedToDialog,
     followProcces: getFollowProccesSelector(state),
        isFollowed: state.ProfilePage.isFollowed

});


let AddURLdate = withRouter(ProfileContainer);

export default connect (mapStateToProps, {setProfile,
                                            getProfileThunkCreator,
                                            searchingThunkCreator,
                                            updateStatusThunkCreator,
                                            getStatusThunkCreator,
                                            uploadAvatarThunkCreator,
                                            startChatingThunkCreator,
                                            setRedirectedToDialog,
                                            followThunkCreator,
                                            unfollowThunkCreator})(AddURLdate);