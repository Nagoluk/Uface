import React, {useEffect} from 'react';
import p from './profile.module.css';
import ProfileInfo from './ProfileInfo/profileInfo';
import Preloader from '../assets/preloader/Preloader';
import {useDispatch, useSelector} from 'react-redux';
import {
    getIsProfileFetching,
    getProfileErrorSelector,
    getProfileSelector
} from '../../redux-state/selectors/profile-selector';
import {getMyIdSelector} from '../../redux-state/selectors/login-selectors';
import MyPosts from './MyPosts/MyPosts';
import {useParams, useHistory} from 'react-router-dom'
import {getProfileThunkCreator, getStatusThunkCreator, actionsProfile} from '../../redux-state/profileReducer';
import {useRedirect} from '../../hook/Redirect';
import { NetworkError } from '../common/NetworkError/NetworkError';
import {getIsRedirectToDialog} from '../../redux-state/selectors/message-selectors';
import {actionsMessages} from '../../redux-state/messageReducer';


const Profile = () => {

    const isFetching = useSelector(getIsProfileFetching)
    const profile = useSelector(getProfileSelector)
    const error = useSelector(getProfileErrorSelector)
    const myId = useSelector(getMyIdSelector)
    const isRedirectToDialog = useSelector(getIsRedirectToDialog)
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
    useEffect(() => {
        return () => {
            dispatch(actionsProfile.setProfile(null));
            dispatch(actionsMessages.setRedirectedToDialog(false))
        }
    }, [])

    useEffect(() =>{
        document.title = 'Profile';
        setProfile();
    }, [params])

    if(error) {
        return <NetworkError refresh={setProfile}/>
    }

    if (isFetching || profile === null) {
        return (<Preloader/>)
    }
    return (
        <div className={p.profile}>
            <ProfileInfo profile={profile} myId={myId} isRedirectToDialog={isRedirectToDialog}/>

            {profile.userId === myId && <MyPosts profile={profile}/>}
        </div>
    );
}

export default Profile;