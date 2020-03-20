import React from "react"
import p from "../profile.module.css";
import Status from "./status/statusHook";
import profileAvatar from "../../../img/Profile/avatar.png";



const ProfileInfo = (props) => {
        let uploadPhoto = (e) => {
            props.uploadAvatarThunkCreator((e.target.files[0]));
        }

        let amI = props.profile.profile.userId === props.loginData.id;


        return (
            <div className={p.profileWrap}>
               
             <div className={p.photowrap} ></div>
                
                <div className={p.information}>


                {amI && <div className={p.avatarWrap}>
                        <div className={p.changeAvatarContainer}>
                            <img src={props.profile.profile.photos.large || profileAvatar} className={p.avatar} alt="Avatar"/>
                            <label  htmlFor="avatar" className={p.changeAvatar}>
                               <div className={p.AvatarControl}>
                                            <i className="fas fa-upload"></i>
                                            <input type="file" id="avatar" className={p.Avatar} onChange={uploadPhoto}/>
                                </div>
                            </label>
                        </div>
                    </div>
                }

                {!amI && <div className={p.avatarWrap} >
                       
                    <img src={props.profile.profile.photos.large || profileAvatar} 
                    className={p.avatar} style={{border: "3px solid #fff"}}
                    alt="Avatar"/>
                            
                </div>
                }

                    

                    <div className={p.info}>
                        <h2>{props.profile.profile.fullName}</h2>
                        <ul>
                            <li>
                                <span className={p.infoItem}>Status: </span>
                                <Status status={props.status || "No status"}
                                        updateStatusThunkCreator={props.updateStatusThunkCreator}
                                        amI={amI}
                                />
                            </li>
                            <li><span className={p.infoItem}>About me: </span> {props.profile.aboutMe || "No about me"}</li>
                          
                        </ul>
                    </div>


                    

                </div>


                <div className={p.information + " " + p.contacts}>
                    <ul>
                        {/* <li><p>Contacts: </p></li> */}
                        <li><i className="fab fa-facebook"></i></li>
                        <li><i className="fab fa-internet-explorer"></i></li>
                        <li><i className="fab fa-vk"></i></li>
                        <li><i className="fab fa-twitter"></i></li>
                        <li><i className="fab fa-instagram"></i></li>
                        <li><i className="fab fa-youtube"></i></li>
                        <li><i className="fab fa-github"></i></li>
                        <li><i className="fab fa-linkedin-in"></i></li>
                    </ul>
                </div>

            </div>
        );
}

export default ProfileInfo;