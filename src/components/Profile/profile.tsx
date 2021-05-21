import React, {useEffect} from 'react';
import p from './profile.module.css';
import ProfileInfo from './ProfileInfo/profileInfo';
import Preloader from '../assets/preloader/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {getIsProfileFetching, getProfileSelector} from '../../redux-state/selectors/profile-selector';
import {getMyIdSelector} from '../../redux-state/selectors/login-selectors';
import MyPosts from './MyPosts/MyPosts';
import {useParams, useHistory} from 'react-router-dom'
import {getProfileThunkCreator, getStatusThunkCreator, actionsProfile} from '../../redux-state/profileReducer';
import {useRedirect} from '../../hook/Redirect';


const Profile = () => {

    const isFetching = useSelector(getIsProfileFetching)
    const profile = useSelector(getProfileSelector)
    const myId = useSelector(getMyIdSelector)
    const params = useParams<{userID: string}>()
    const history = useHistory()
    const dispatch = useDispatch()

    useRedirect()

    const setProfile = () => {
        let userID: string | number | null = params.userID;

        if (!userID) {
            userID = myId;

            if (!userID) {
                history.push('/login')
                return
            }
        }

        dispatch(getProfileThunkCreator(+userID));
        dispatch(getStatusThunkCreator(+userID));
    }
    useEffect(() =>{
        document.title = 'Profile';
        setProfile();

        return () => {
            // dispatch(actionsProfile.setRedirectedToDialog(false));
            dispatch(actionsProfile.setProfile(null));
        }
    }, [params])

    if (isFetching || profile === null) {
        return (<Preloader/>)
    }
    return (
        <div className={p.profile}>
            <ProfileInfo profile={profile} myId={myId}/>

            {profile.userId === myId && <MyPosts profile={profile}/>}
        </div>
    );
}

export default Profile;