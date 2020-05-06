import React, {useState} from 'react';
import MyPost from "../../Profile/MyPosts/MyPosts.module.css";
import DialogMod from "./DialogWithUser.module.css";
import {NavLink} from "react-router-dom";
import Avatar from "../../../img/Profile/avatar.png";
import Messages from "./Messages/Messages";
import Alert from "../../common/alert/alert";


const Dialog = (props) => {
    let [message, setMessageText] = useState("");
    let [isNewMessage, setIsNewMessage] = useState(false);

    return (<div className={DialogMod.dialogWithUser}>
                <div className={DialogMod.dialogHeader}>
                    <img src={props.userData.photos.small || props.userData.photos.large || Avatar} alt="avatar" className={DialogMod.Dialogavatar}/>

                    <div>
                        <NavLink to={"/profile/"+props.dialogId}><h3>{props.userData.userName}</h3></NavLink>
                        <div className={DialogMod.status}>Was online: {props.userData.lastUserActivityDate.split("T").join(" ").slice(0, 16)}</div>
                    </div>

                    <div className={DialogMod.backToDialogList}>
                        <NavLink to="/dialogs">
                            <i className="fas fa-chevron-left"></i>
                        </NavLink>
                    </div>
                </div>



               <Messages myId={props.id}
                         dialogId={props.dialogId}
                         getNewMessageCountThunkCreator={props.getNewMessageCountThunkCreator}
                         isNewMessage={isNewMessage}
                         setIsNewMessage={setIsNewMessage}
               />


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
                                setIsNewMessage(true);
                                setMessageText("")
                                props.sendMessagesThunkCreator(props.dialogId, message)
                            }}
                            disabled={message === ""}>Send <i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
             </div>);

};

export default Dialog;