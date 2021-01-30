import React from 'react';
import p from './profile.module.css';
import MyPostsContainer from './MyPosts/MyPostsConteiner';
import ProfileInfo from './ProfileInfo/profileInfo';
import Preloader from '../assets/preloader/Preloader';


const Profile = (props) => {


    if (props.profile.isFetching || props.profile.profile === null) {
        return (<Preloader/>)
    }
    return (
        <div className={p.profile}>
            <ProfileInfo profile={props.profile}
                         lang={props.lang}
                         updateStatusThunkCreator={props.updateStatusThunkCreator}
                         uploadAvatarThunkCreator={props.uploadAvatarThunkCreator}
                         status={props.status}
                         loginData={props.loginData}
                         startChatingThunkCreator={props.startChatingThunkCreator}
                         isRedirectedToDialog={props.isRedirectedToDialog}
                         followProcces={props.followProccess}
                         isFollowed={props.isFollowed}
                         followThunkCreator={props.followThunkCreator}
                         unfollowThunkCreator={props.unfollowThunkCreator}

            />

            {props.profile.profile.userId === props.loginData.id &&
            <MyPostsContainer store={props.store} profile={props.profile} black={props.black}/>}

        </div>
    );
}

export default Profile;