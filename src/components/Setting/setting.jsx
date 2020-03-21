import React from 'react';
import Set from './setting.module.css';
import {connect} from "react-redux";
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import UpdateContacts from "./UpdateProfile/Contacts";
import {getProfileThunkCreator, putUserDataThunkCreator} from "../../Redux/profileReducer";
import LoginHoc from "../../hoc/loginHoc";

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


const Setting = (props) => {
    return (<div className={Set.wrap}>
                <div className={Set.item}>
                    <UpdateProfile profile={props.profile} putUserData={props.putUserDataThunkCreator}/>
                </div>

                <div className={Set.item}>
                    <UpdateContacts profile={props.profile} putUserData={props.putUserDataThunkCreator}/>
                </div>
        </div>)
}


let mapStateToProps = (state) => {
    return {
        state: state.SetLang,
        profile: state.ProfilePage.profile,
        id: state.LoginReducer.id
    }

}



export default LoginHoc(connect(mapStateToProps, {putUserDataThunkCreator, getProfileThunkCreator})(SettingContainer))
