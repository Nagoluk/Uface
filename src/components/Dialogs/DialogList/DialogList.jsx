import React from 'react';
import d from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import Avatar from "../../../img/Profile/avatar.png";

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;

    return (<li>
                <div className={d.avatar}>
                    <img src={Avatar} alt={"avatar"}/>
                </div>

                <div className={d.dates}>
                    <NavLink to={path}>{props.name}</NavLink>

                    <div className={d.lastMessage}>
                        {props.LastMessage}
                    </div>
                 </div>
             </li>);
}

const Dialogs = (props) => {
    let Length = props.mess.messageData.length - 1;
    let LastMessage = props.mess.messageData[Length].message;

    let dialogsElements = props.mess.dialogs.map((dialog, key) => {
        return <DialogItem name={dialog.name} key={key} id={dialog.id} LastMessage={LastMessage}/>
    });


    return(
    <div className={d.dialogs}>
        <div className={d.dialogList}>
            <div className={d.dialogListHeader}>
                <i className="fas fa-plus"></i>

                <div className={d.searchDialog}>
                    <i className="fas fa-search" aria-hidden="true"></i>
                    <input type="text" placeholder={"пошук"}/>
                </div>
            </div>

            <div className={d.contactList}>
                <ul>
                    {dialogsElements.length ? dialogsElements : <p>Нет сообщений</p>}
                </ul>
            </div>

            <div className={d.dialogListFooter}>
                <i className="far fa-bell-slash"></i>
            </div>
        </div>
    </div>);

}

export default Dialogs;
