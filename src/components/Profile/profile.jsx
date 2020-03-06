import React from 'react';
import p from "./profile.module.css";
import MyPostsContainer from "./MyPosts/MyPostsConteiner";
import ProfileInfo from "./ProfileInfo/profileInfo";
import Preloader from"../assets/preloader/Preloader"


const Profile = (props) => {
   
    if(!props.profile) {
        return(<Preloader/>)
    }
    return (
        <div className={p.profile}>

            <ProfileInfo profile ={props.profile} lang={props.lang} updateStatusThunkCreator={props.updateStatusThunkCreator} status={props.status}/>
            <MyPostsContainer store={props.store} profile ={props.profile} />

        </div>
    );
}

export default Profile;