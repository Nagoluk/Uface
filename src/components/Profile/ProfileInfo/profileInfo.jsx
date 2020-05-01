import React, {useState} from "react"
import p from "../profile.module.css";
import Status from "./status/statusHook";
import profileAvatar from "../../../img/Profile/avatar.png";
import Gellery from "../../common/gallery/gallery";
import {Redirect} from "react-router-dom";
import UsersStlyes from "../../Users/Users.module.css";



const ProfileInfo = ({profile: {profile}, profile: {profile: {contacts}}, ...props}) => {


    let hasContact = false;
    let amI = profile.userId === props.loginData.id;

    for(let key in contacts){
        if(contacts[key] !== null){
          hasContact = true;
        }
    }

    let [showGallery, setShowGallery] = useState(false)

    let normalizeLink = (link) => {
        if(link.match("https://") || link.match("http://")){

            return link;
        }else {
            return "//" + link;
        }
    }

    let uploadPhoto = (e) => {
        props.uploadAvatarThunkCreator((e.target.files[0]));
    }

    let Gallery = () => {
        if(profile.photos.large || profile.photos.small){
            setShowGallery(true)
        }
    }

    if(props.isRedirectedToDialog){
        return <Redirect to={"/dialogs/" + profile.userId}/>
    }


    return (<div className={p.profileWrap}>
                <div className={p.photowrap} ></div>

                <div className={p.information}>
                    {amI && <div className={p.avatarWrap}>
                                <div className={p.changeAvatarContainer}>
                                    <img src={profile.photos.large || profileAvatar} 
                                    className={p.avatar}
                                    alt="Avatar" onClick={Gallery}/>

                                    <label  htmlFor="avatar" className={p.changeAvatar}>
                                        <div className={p.AvatarControl}>
                                            <i className="fas fa-upload"></i>
                                            <input type="file" id="avatar" onInput={uploadPhoto} style={{display: "none"}}/>
                                        </div>
                                    </label>
                                </div>
                            </div>}

                    {!amI && <div className={p.avatarWrap} >
                        
                        <img src={profile.photos.large || profileAvatar} 
                        className={p.avatar} style={{border: "3px solid #fff"}}
                        alt="Avatar" onClick={Gallery}/>
                                
                    </div>}

                    <div className={p.info}>
                        <h2>{profile.fullName}</h2>

                        <ul className={p.about}>
                            <li>
                                <span className={p.infoItem}><i className="far fa-smile"></i></span>
                                <Status status={props.status || "No status"}
                                        updateStatusThunkCreator={props.updateStatusThunkCreator}
                                        amI={amI}
                                    />
                            </li>

                            {profile.aboutMe && <li>
                                    <span className={p.infoItem}><i className="far fa-address-card"></i></span>
                                    {profile.aboutMe} 
                            </li>}

                            {profile.lookingForAJob && <li>
                                    <span className={p.infoItem}><i className="fas fa-briefcase"></i></span>
                                    <b>Looking for a job</b>

                                    <p className={p.description}>{profile.lookingForAJobDescription}</p>
                            </li>}
                            
                        </ul>
                    </div>

                    {!amI &&  <div className={p.Activity}>

                        {props.isFollowed ?
                            <button disabled={props.followProcces.some(item => item === profile.userId)}
                                                    className={UsersStlyes.follower + " " + p.ActivityButtons + " " + p.Unfollow}
                                                    onClick={() => {

                                                        props.unfollowThunkCreator(profile.userId)
                                                    }}>Unfollow</button> :  <button disabled={props.followProcces.some(item => item === profile.userId)}
                                className={UsersStlyes.follower + " " + p.ActivityButtons}
                                onClick={() => {

                                    props.followThunkCreator(profile.userId)
                                }}>follow</button>}

                        <button onClick={() => props.startChatingThunkCreator(profile.userId)} className={p.Mail}><i className="far fa-envelope"></i></button>


                    </div>}
                </div>

                {hasContact && <div className={p.information + " " + p.contacts}>
                    <ul>
                        {contacts.facebook && <li>
                            <a href={normalizeLink(contacts.facebook)} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-facebook"></i>
                            </a>
                        </li>}

                        {contacts.website && <li>
                            <a href={normalizeLink(contacts.website)} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-internet-explorer"></i>
                            </a>
                        </li>}

                        {contacts.vk && <li><a href={normalizeLink(contacts.vk)} target="_blank" rel="noopener noreferrer" >
                            <i className="fab fa-vk"></i></a>
                        </li>}

                        {contacts.twitter && <li>
                            <a href={normalizeLink(contacts.twitter)} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>}

                        {contacts.instagram && <li>
                            <a href={normalizeLink(contacts.instagram)} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>}
                            
                        {contacts.youtube && <li>
                            <a href={normalizeLink(contacts.youtube)} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-youtube"></i>
                            </a>
                        </li>}

                        {contacts.github && <li>
                            <a href={normalizeLink(contacts.github)} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-github"></i>
                            </a>
                        </li>}

                        {contacts.mainLink && <li>
                            <a href={normalizeLink(contacts.mainLink)} target="_blank" rel="noopener noreferrer">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </li>}
                    </ul>
                </div>}

                {showGallery && <Gellery img={profile.photos.large} setShowGallery={setShowGallery} amI={amI} uploadPhoto={uploadPhoto}/>}



            </div>
        );
}

export default ProfileInfo;