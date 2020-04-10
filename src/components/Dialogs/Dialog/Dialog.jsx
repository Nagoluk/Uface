import React from 'react';
import MyPost from "../../Profile/MyPosts/MyPosts.module.css";
import DialogMod from "./DialogWithUser.module.css";
import {NavLink} from "react-router-dom";
import Avatar from "../../../img/Profile/avatar.png"


const Message = (props) => {
    let data = props.addedAt.slice(11, 19);

    return (
        <div className={DialogMod.messageItem + " " + DialogMod.isMy} >
            <div className={DialogMod.messageItemLogo}></div>
            <span className={DialogMod.data}>{data}</span>
            {props.mail}
        </div>
    );
};


const Dialog = (props) => {
    let messages = props.messagesData.items.map((d, index) => <Message mail={d.body} addedAt={d.addedAt}key={index}/>)

    return (<div className={DialogMod.dialogWithUser}>
                <div className={DialogMod.dialogHeader}>
                    <img src={Avatar} alt="Avatar" className={DialogMod.Dialogavatar}/>

                    <div>
                        <h3>Alexandr Soroka</h3>
                        <div className={DialogMod.status}>Online</div>
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
                            <button className={MyPost.button + " " + MyPost.send}>send <i className="fas fa-mail-bulk"></i></button>
                        </div>
                </div>

        </div>
    );


};

export default Dialog;