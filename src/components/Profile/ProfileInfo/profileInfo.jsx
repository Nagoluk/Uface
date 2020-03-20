import React from "react"
import p from "../profile.module.css";
import Status from "./status/statusHook";
import profileAvatar from "../../../img/Profile/avatar.png";



const ProfileInfo = ({profile: {profile}, profile: {profile: {contacts}}, ...props}) => {

    let hasContact = false;
    let amI = profile.userId === props.loginData.id;

    for(let key in contacts){
        if(contacts[key] !== null){
          hasContact = true;
        }
    }

    let uploadPhoto = (e) => {
        props.uploadAvatarThunkCreator((e.target.files[0]));
    }

    return (<div className={p.profileWrap}>
                <div className={p.photowrap} ></div>

                <div className={p.information}>
                    {amI && <div className={p.avatarWrap}>
                                <div className={p.changeAvatarContainer}>
                                    <img src={profile.photos.large || profileAvatar} 
                                    className={p.avatar}
                                    alt="Avatar"/>

                                    <label  htmlFor="avatar" className={p.changeAvatar}>
                                        <div className={p.AvatarControl}>
                                            <i className="fas fa-upload"></i>
                                            <input type="file" id="avatar" 
                                            className={p.Avatar} onInput={uploadPhoto}/>
                                        </div>
                                    </label>
                                </div>
                            </div>}

                    {!amI && <div className={p.avatarWrap} >
                        
                        <img src={profile.photos.large || profileAvatar} 
                        className={p.avatar} style={{border: "3px solid #fff"}}
                        alt="Avatar"/>
                                
                    </div>}

                    <div className={p.info}>
                        <h2>{profile.fullName}</h2>

                        <ul>
                            <li>
                                <span className={p.infoItem}>Status: </span>
                                <Status status={props.status || "No status"}
                                        updateStatusThunkCreator={props.updateStatusThunkCreator}
                                        amI={amI}
                                    />
                            </li>

                            {profile.aboutMe && <li>
                                    <span className={p.infoItem}><i class="far fa-address-card"></i></span>
                                    {profile.aboutMe} 
                            </li>}

                            {profile.lookingForAJob && <li>
                                    <span className={p.infoItem}><i className="fas fa-briefcase"></i></span>
                                    <b>Looking for a job</b>

                                    <p className={p.description}>{profile.lookingForAJobDescription}</p>
                            </li>}
                            
                        </ul>
                    </div>
                </div>

                {hasContact && <div className={p.information + " " + p.contacts}>
                    <ul>
                        {contacts.facebook && <li>
                            <a href={contacts.facebook} target="_blank">
                                <i className="fab fa-facebook"></i>
                            </a>
                        </li>}

                        {contacts.website && <li>
                            <a href={contacts.website} target="_blank" >
                                <i className="fab fa-internet-explorer"></i>
                            </a>
                        </li>}

                        {contacts.vk && <li><a href={contacts.vk} target="_blank" >
                            <i className="fab fa-vk"></i></a>
                        </li>}

                        {contacts.twitter && <li>
                            <a href={contacts.twitter} target="_blank" >
                                <i className="fab fa-twitter"></i>
                            </a>
                        </li>}

                        {contacts.instagram && <li>
                            <a href={contacts.instagram} target="_blank" >
                                <i className="fab fa-instagram"></i>
                            </a>
                        </li>}
                            
                        {contacts.youtube && <li>
                            <a href={contacts.youtube} target="_blank" >
                                <i className="fab fa-youtube"></i>
                            </a>
                        </li>}

                        {contacts.github && <li>
                            <a href={contacts.github} target="_blank" >
                                <i className="fab fa-github"></i>
                            </a>
                        </li>}

                        {contacts.mainLink && <li>
                            <a href={contacts.mainLink} target="_blank" >
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                        </li>}
                    </ul>
                </div>}

            </div>
        );
}

export default ProfileInfo;