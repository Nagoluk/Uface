import React from 'react';
import MyPost from "../../Profile/MyPosts/MyPosts.module.css";
import DialogMod from "./DialogWithUser.module.css";
import {NavLink} from "react-router-dom";




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

const DialogWithPerson = (props) => {



    let newMessage = React.createRef();

    let SendMessage = () =>{
        if(newMessage.current.value !== '') {
            //props.dispatch(createNewMessage());
        }
    }

    let updateMessageText = () =>{
        //props.dispatch(createNewMessageSymbol(newMessage.current.value));
    }


    let messages = props.state.MessagePage.messageData.map(d => <Message mail={d.message}/>)
    console.log(props);


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
                        <span>{props.state.SetLang.eng ? "Back" : "Назад"}</span>
                    </NavLink>

                </div>

            </div>

            <div className={DialogMod.messages}>
                {messages}
            </div>

            <div className={DialogMod.createNewMessage}>
                <input name="newMessage" ref={newMessage} placeholder="Новое сообщение" value={props.state.MessagePage.updateMessageData} onChange={updateMessageText}></input>

                <div className={DialogMod.createNewMessageAcivities}>
                    <button className={MyPost.button}><i className="fas fa-photo-video"></i></button>
                    <button className={MyPost.button}><i className="fas fa-headphones-alt"></i></button>
                    <button className={MyPost.button + " " + MyPost.send} onClick={SendMessage}><i className="fas fa-paper-plane"></i>
                    </button>
                </div>

            </div>

        </div>
    );


};

export default DialogWithPerson;