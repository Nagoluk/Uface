import React, {useState} from 'react';
import MyPost from "../../Profile/MyPosts/MyPosts.module.css";
import DialogMod from "./DialogWithUser.module.css";
import {NavLink} from "react-router-dom";
import Avatar from "../../../img/Profile/avatar.png";
import Messages from "./Messages/Messages";


const Dialog = (props) => {
    let [message, setMessageText] = useState("");


    return (<div className={DialogMod.dialogWithUser}>
                <div className={DialogMod.dialogHeader}>
                    <img src={Avatar | props.userData.photos.small | props.userData.photos.large} alt="avatar" className={DialogMod.Dialogavatar}/>

                    <div>
                        <h3>{props.userData.userName}</h3>
                        <div className={DialogMod.status}>Was online: {props.userData.lastUserActivityDate}</div>
                    </div>

                    <div className={DialogMod.backToDialogList}>
                        <NavLink to="/dialogs">
                            <i className="fas fa-chevron-left"></i>
                        </NavLink>
                    </div>
                </div>

               <Messages myId={props.id}/>



                <div className={DialogMod.createNewMessage}>

                    <textarea name={"newMessage"} placeholder={"Новое сообщение"}
                              value={message}
                              onChange={(e) => setMessageText(e.target.value)}
                              />

                    <div className={DialogMod.createNewMessageAcivities}>
                        <button className={MyPost.button} disabled><i className="fas fa-photo-video"></i></button>
                        <button className={MyPost.button} disabled><i className="fas fa-headphones-alt"></i></button>
                        <button
                            className={MyPost.button + " " + MyPost.send}
                            onClick={() =>{
                                setMessageText("")
                                props.sendMessagesThunkCreator(props.dialogId, message)
                            }}
                            disabled={message === ""}>Send <i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
             </div>);

};

export default Dialog;