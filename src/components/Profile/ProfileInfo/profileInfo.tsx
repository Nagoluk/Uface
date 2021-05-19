import React, {useState} from 'react'
import p from '../profile.module.css';
import Status from './status/statusHook';
import profileAvatar from '../../../img/Profile/avatar.png';
import {ProfileItemStyled} from '../../../styles/theme';
import {ProfileType} from '../../../interfaces/profile-interfaces';
import {useDispatch} from 'react-redux';
import {uploadAvatarThunkCreator} from '../../../redux-state/profileReducer';
import Gellery from '../../common/gallery/gallery';
import {useTranslation} from 'react-i18next';
import {
    ExceptionOutlined,
    FileSearchOutlined,
    SmileOutlined,
    FacebookOutlined,
    DribbbleOutlined,
    IeOutlined,
    TwitterOutlined,
    InstagramOutlined,
    YoutubeOutlined,
    GithubOutlined,
    LinkedinOutlined,
    CloudUploadOutlined
} from '@ant-design/icons';



type ownProps = {
    profile: ProfileType,
    myId: string | number | null
}
const ProfileInfo: React.FC<ownProps> = ({profile, myId}) => {
    const dispatch = useDispatch()
    const { t } = useTranslation();

    let hasContact = false;
    let amI: boolean = profile.userId === myId;


    const {contacts} = profile

    for (let key in contacts) {
        //@ts-ignore
        if (contacts[key] !== null && contacts[key] !== '') {
            hasContact = true;
        }
    }

    let [showGallery, setShowGallery] = useState(false)

    let normalizeLink = (link: string) => {
        if (link.match('https://') || link.match('http://')) {
            return link;
        } else {
            return '//' + link;
        }
    }

    let uploadPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files !== null){
            dispatch(uploadAvatarThunkCreator((e.target.files[0])));
        }
    }

    let Gallery = () => {
        if (profile.photos.large || profile.photos.small) {
            setShowGallery(true)
        }
    }

    // if (props.isRedirectedToDialog) {
    //     return <Redirect to={'/dialogs/' + profile.userId}/>
    // }


    return (<div className={p.profileWrap}>
            <div className={p.photowrap}></div>

            <ProfileItemStyled className={p.information}>
                {amI && <div className={p.avatarWrap}>
                    <div className={p.changeAvatarContainer}>
                        <img src={profile.photos.large || profileAvatar}
                             className={p.avatar}
                             alt="Avatar" onClick={Gallery}/>

                        <label htmlFor="avatar" className={p.changeAvatar}>
                            <div className={p.AvatarControl}>
                                <CloudUploadOutlined />
                                <input type="file" id="avatar" onInput={uploadPhoto} style={{display: 'none'}}/>
                            </div>
                        </label>
                    </div>
                </div>}

                {!amI && <div className={p.avatarWrap}>

                    <img src={profile.photos.large || profileAvatar}
                         className={p.avatar} style={{border: '3px solid #fff'}}
                         alt="Avatar" onClick={Gallery}/>

                </div>}

                <div className={p.info}>
                    <h2>{profile.fullName}</h2>

                    <ul className={p.about}>
                        <li>
                            <span className={p.infoItem}><SmileOutlined /></span>
                            <Status amI={amI}/>
                        </li>

                        {profile.aboutMe && <li>
                            <span className={p.infoItem}><ExceptionOutlined /></span>
                            {profile.aboutMe}
                        </li>}

                        {profile.lookingForAJob && <li>
                            <span className={p.infoItem}><FileSearchOutlined /></span>
                            <b>{t('profile.lookingJob')}</b>

                            <p className={p.description}>{profile.lookingForAJobDescription}</p>
                        </li>}

                    </ul>
                </div>

                {!amI && <div className={p.Activity}>

                    {/*{props.isFollowed ?*/}
                    {/*    <button disabled={props.followProcces.some(item => item === profile.userId)}*/}
                    {/*            className={UsersStlyes.follower + ' ' + p.ActivityButtons + ' ' + p.Unfollow}*/}
                    {/*            onClick={() => {*/}

                    {/*                props.unfollowThunkCreator(profile.userId)*/}
                    {/*            }}>Unfollow</button> :*/}
                    {/*    <button disabled={props.followProcces.some(item => item === profile.userId)}*/}
                    {/*            className={UsersStlyes.follower + ' ' + p.ActivityButtons}*/}
                    {/*            onClick={() => {*/}
                    {/*                props.followThunkCreator(profile.userId)*/}
                    {/*            }}>follow</button>}*/}

                    {/*<button onClick={() => props.startChatingThunkCreator(profile.userId)} className={p.Mail}><i*/}
                    {/*    className="far fa-envelope"></i></button>*/}


                </div>}
            </ProfileItemStyled>

            {hasContact && <ProfileItemStyled className={p.information + ' ' + p.contacts}>
                <ul>
                    {contacts.facebook && <li>
                        <a href={normalizeLink(contacts.facebook)} target="_blank" rel="noopener noreferrer">
                            <FacebookOutlined />
                        </a>
                    </li>}

                    {contacts.website && <li>
                        <a href={normalizeLink(contacts.website)} target="_blank" rel="noopener noreferrer">
                            <DribbbleOutlined />
                        </a>
                    </li>}

                    {contacts.vk && <li><a href={normalizeLink(contacts.vk)} target="_blank" rel="noopener noreferrer">
                                <IeOutlined />
                        </a>
                    </li>}

                    {contacts.twitter && <li>
                        <a href={normalizeLink(contacts.twitter)} target="_blank" rel="noopener noreferrer">
                            <TwitterOutlined />
                        </a>
                    </li>}

                    {contacts.instagram && <li>
                        <a href={normalizeLink(contacts.instagram)} target="_blank" rel="noopener noreferrer">
                            <InstagramOutlined />
                        </a>
                    </li>}

                    {contacts.youtube && <li>
                        <a href={normalizeLink(contacts.youtube)} target="_blank" rel="noopener noreferrer">
                            <YoutubeOutlined />
                        </a>
                    </li>}

                    {contacts.github && <li>
                        <a href={normalizeLink(contacts.github)} target="_blank" rel="noopener noreferrer">
                            <GithubOutlined />
                        </a>
                    </li>}

                    {contacts.mainLink && <li>
                        <a href={normalizeLink(contacts.mainLink)} target="_blank" rel="noopener noreferrer">
                            <LinkedinOutlined />
                        </a>
                    </li>}
                </ul>
            </ProfileItemStyled>}

            {showGallery &&
            <Gellery img={profile.photos.large as string} setShowGallery={setShowGallery} amI={amI} uploadPhoto={uploadPhoto}/>}


        </div>
    );
}

export default ProfileInfo;