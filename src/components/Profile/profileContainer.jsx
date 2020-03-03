import React from 'react';
import Profile from "./profile";
import {connect} from "react-redux";
import * as axios from "axios";
import {setProfile, newSymbolAC} from "../../Redux/profileReducer";
import {withRouter} from "react-router-dom";
import LoginHoc from "../../hoc/loginHoc";


class ProfileContainer extends React.Component{

    componentDidMount() {

        let userID = this.props.match.params.userID | 2;

      
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userID).then(response => {

            this.props.setProfile(response.data);
        });

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

let isLogined = LoginHoc(ProfileContainer);
let AddURLdate = withRouter(isLogined);

export default connect (mapStateToProps, {setProfile})(AddURLdate);