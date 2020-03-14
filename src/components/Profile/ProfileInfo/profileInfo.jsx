import React from "react"
import p from "../profile.module.css";
import Status from "./status/statusHook";
import profileAvatar from "../../../img/Profile/avatar.jpg";



const ProfileInfo = (props) => {
    // debugger;


        return (
            <div className={p.profileWrap}>
               
             <div className={p.photowrap} ></div>
                
                <div className={p.information}>


                    <div >
                        <img src={props.profile.profile.photos.large || profileAvatar} className={p.avatar} alt="Avatar"/>
                    </div>

                    <div className={p.info}>
                        <h2>{props.profile.profile.fullName}</h2>
                        <ul>
                            {/* <li><span className={p.infoItem}>{(props.lang.eng) ? "Status:" : "Статус"} </span>{props.profile.aboutMe}</li> */}
                            <li><span className={p.infoItem}>{(props.lang.eng) ? "Status:" : "Статус"} </span>
                                {/* <Status status={props.status} id={props.profile.profile.userId} updateStatusThunkCreator={props.updateStatusThunkCreator} loginData={props.loginData}/> */}
                                <Status status={props.status} 
                                        id={props.profile.profile.userId} 
                                        updateStatusThunkCreator={props.updateStatusThunkCreator} 
                                        loginData={props.loginData}/>
                            </li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>

                </div>

            </div>
        );
}

export default ProfileInfo;