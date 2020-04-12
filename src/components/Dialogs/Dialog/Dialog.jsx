import React from 'react';
import MyPost from "../../Profile/MyPosts/MyPosts.module.css";
import DialogMod from "./DialogWithUser.module.css";
import {NavLink} from "react-router-dom";
import Avatar from "../../../img/Profile/avatar.png";

const Message = (props) => {
    let now = new Date().toString().slice(16, 21);

    return (
        <div className={DialogMod.messageItem + " " + (props.myId === props.senderId ? DialogMod.isMy : "")} >
            <div className={DialogMod.messageItemLogo}></div>
            <span className={DialogMod.data}>{now}</span>
            {props.mail}
        </div>
    );
};


const Dialog = (props) => {
    let messages = props.messagesData.items.map(messageItem => <Message mail={messageItem.body}
                                                                        key={messageItem.id}
                                                                        myId={props.id}
                                                                        senderId={messageItem.senderId}/>)

    return (<div className={DialogMod.dialogWithUser}>
                <div className={DialogMod.dialogHeader}>
                    <img src={Avatar || props.userData.photos.small || props.userData.photos.large} alt="avatar" className={DialogMod.Dialogavatar}/>

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

                <div className={DialogMod.messages}>
                    {messages}
                </div>

                <div className={DialogMod.createNewMessage}>

                    <textarea name={"newMessage"} placeholder={"Новое сообщение"} />

                    <div className={DialogMod.createNewMessageAcivities}>
                        <button className={MyPost.button} disabled><i className="fas fa-photo-video"></i></button>
                        <button className={MyPost.button} disabled><i className="fas fa-headphones-alt"></i></button>
                        <button className={MyPost.button + " " + MyPost.send}>send <i className="fas fa-paper-plane"></i></button>
                    </div>
                </div>
             </div>);

};

export default Dialog;