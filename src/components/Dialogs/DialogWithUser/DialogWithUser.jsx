import React from 'react';
import MyPost from "../../Profile/MyPosts/MyPosts.module.css";
import DialogMod from "./DialogWithUser.module.css";
import {NavLink} from "react-router-dom";
import { Field, reduxForm } from 'redux-form';




const Message = (props) => {
    let now = new Date();
    return (
        <div className={DialogMod.messageItem}>
            {props.mail}
            <span className={DialogMod.data}>{now.getHours() + ":" + now.getMinutes()}</span>
            <div className={DialogMod.messageItemLogo}></div>
        </div>
    );
};

const MessageForm = props => {
    return (<form onSubmit={props.handleSubmit}>
                <div className={DialogMod.createNewMessage}>
                    <Field name={"newMessage"} placeholder={"Новое сообщение"} component={"input"}/>

                    <div className={DialogMod.createNewMessageAcivities}>
                        <button className={MyPost.button} disabled><i className="fas fa-photo-video"></i></button>
                        <button className={MyPost.button} disabled><i className="fas fa-headphones-alt"></i></button>
                        <button className={MyPost.button + " " + MyPost.send}><i className="fas fa-paper-plane"></i>
                        </button>
                    </div>

                </div>
            </form>)
} 

let MessageFormReduxForm = reduxForm({form: "messageInput"})(MessageForm)

const DialogWithPerson = (props) => {

    let SendMessage = () =>{
        console.log("hello")
    }


    let messages = props.mess.messageData.map(d => <Message mail={d.message}/>)


    return (<div className={DialogMod.dialogWithUser}>

            <div className={DialogMod.dialogHeader}>

                <div className={DialogMod.Dialogavatar}></div>
                <div>
                    <h3>Alexandr Soroka</h3>
                    <div className={DialogMod.status}>Online</div>
                </div>

                <div className={DialogMod.backToDialogList}>
                    <NavLink to="0">
                        <i className="fas fa-chevron-left"></i>
                        <span>{ "Назад"}</span>
                    </NavLink>

                </div>

            </div>

            <div className={DialogMod.messages}>
                {messages}
            </div>

            <MessageFormReduxForm onSubmit={SendMessage}/>

           

        </div>
    );


};

export default DialogWithPerson;