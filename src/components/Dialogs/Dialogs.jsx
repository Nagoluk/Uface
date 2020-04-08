import React from 'react';
import {NavLink, Route} from "react-router-dom";

import d from "./Dialogs.module.css";
import Avatar from "../../img/Profile/avatar.png";


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
    debugger

    let dialogsElements = props.messageData.dialogs.map((dialog, key) => {
        return <DialogItem name={dialog.name} key={key} id={dialog.id}/>
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




// const Dialogs = (props) => {
//
//     return (<div>
//                 <Route path="/dialogs/0" render={ ()=> <DialogList mess={props.messageData} />}/>
//                 <Route path="/dialogs/1" render={()=> <DialogWithPerson mess={props.messageData} dispatch={props.dispatch}/>}/>
//             </div>
//     );
// };

export default Dialogs;