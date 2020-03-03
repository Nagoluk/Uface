import React from 'react';
import d from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";



const Dialog = (props) => {
    let path = "/dialogs/" + props.id;
    return (<li >
             <div className={d.avatar}><img src="http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg" alt=""/></div>
                <div className={d.dates}>
                    <NavLink to={path}>{props.name}</NavLink>
                    <div className={d.lastMessage}>
                        {props.LastMessage}
                </div>



             </div>

          </li>);
};



const DialogList = (props) => {

    let Lenght = props.state.MessagePage.messageData.length - 1;
    let LastMessage = props.state.MessagePage.messageData[Lenght].message;

    console.log(LastMessage);


    let dialogsElements = props.state.MessagePage.dialogsData.map((dialog) => <Dialog name={dialog.name}
                                                                                      id={dialog.id} LastMessage={LastMessage}/>);


    return(
    <div className={d.dialogs}>


        <div className={d.dialogList}>
            <div className={d.dialogListHeader}>
                <i className="fas fa-plus"></i>


                <div className={d.searchDialog}>
                    <i className="fas fa-search"
                       aria-hidden="true"></i>
                    <input type="text" placeholder={props.state.SetLang.eng ? "search" : "пошук"}/>
                    {/*<button><i className="fas fa-search"></i></button>*/}
                </div>

            </div>



            <div className={d.contactList}>

                <ul>
                    {dialogsElements}


                </ul>

            </div>

            <div className={d.dialogListFooter}>
                <p>{props.state.SetLang.eng ? "Disable notifications" : "Ввимкнути сповіщення"}</p>
                <i className="far fa-bell-slash"></i>
            </div>
        </div>


    </div>);

}

export default DialogList;
