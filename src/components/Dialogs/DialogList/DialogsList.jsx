import React, {useState} from 'react';
import DialogsStyles from "./DialogsList.module.css";
import Avatar from "../../../img/Profile/avatar.png";
import styled from "styled-components";
import {SearchOutlined} from '@ant-design/icons';
import {useHistory} from 'react-router-dom';


const DialogListStyled = styled.div`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    & input, p {
        color: ${props => (props.black ? '#fff' : '#000')};
    }

    && a {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
    
    & svg {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
    
    & h1 {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
    
    & h3 {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
    
    & h1 svg {
        color: ${props => (props.black ? '#0078D4' : '#474B59;')};
    }
    
    & .dialogListHeader {
      position: relative;
      border-bottom: 1px solid ${props => (props.theme.mode === 'dark' ? '#3C3F41' : 'lightgray')}; 
    }
    
   .dialogListHeader>svg {
        position: absolute;
        right: 10px;
        top: 15px;
    }

`

const DialogItemStyled = styled.li`
    cursor: pointer;
    border-bottom: 1px solid  ${props => (props.theme.mode === 'dark' ? '#3C3F41' : 'lightgray')}; 
    
    
    &:hover {
        background: ${props => (props.theme.mode === 'dark' ? '#202020' : '#f2f2f2')}; 
    }
`

const DialogItem = (props) => {
    let path = "/dialogs/" + props.id;


    return (<DialogItemStyled className={DialogsStyles.DialogItem} onClick={() => props.history.push(path)}>
                <div className={DialogsStyles.avatar}>
                    <img src={props.photos.small || Avatar} alt={"avatar"}/>
                </div>

                <div className={DialogsStyles.dates}>
                    <h3>{props.name}</h3>

                    <div className={DialogsStyles.lastMessage}>
                        <span>Last message: </span>{props.lastDialogActivityDate}
                        {props.LastMessage}
                    </div>
                </div>

                 {(props.newMessagesCount > 0) && <div className={DialogsStyles.newMessagesCount + " " + DialogsStyles.active}>
                    {props.newMessagesCount}
                 </div>}
            </DialogItemStyled>);
}

export const DialogsList = (props) => {
    const history = useHistory()
    const [searchText, setSearchText] = useState('')

    let dialogsCopied = [...props.dialogs]

    if(searchText.trim() !== "") {
        dialogsCopied = [...props.dialogs].filter(item => item.userName.toLowerCase().includes(searchText.toLowerCase()))
    }

    let dialogsElements = dialogsCopied.map((dialog, key) => {
        return <DialogItem name={dialog.userName}
                           key={key} id={dialog.id}
                           lastDialogActivityDate={dialog.lastDialogActivityDate}
                           lastUserActivityDate={dialog.lastUserActivityDate}
                           newMessagesCount={dialog.newMessagesCount}
                           photos={dialog.photos}
                           history={history}
        />
    });

    return(
        <div className={DialogsStyles.dialogs}>
            <DialogListStyled className={DialogsStyles.dialogList} black={props.black}>
                <div className={'dialogListHeader'}>
                    <div className={DialogsStyles.searchDialog}>
                        <SearchOutlined />
                        <input type="text" placeholder={"Search dialog"} onChange={event => setSearchText(event.target.value)}/>
                    </div>
                </div>

                <div className={DialogsStyles.contactList}>
                    <ul>
                        {dialogsElements.length ? dialogsElements : <p>No message</p>}
                    </ul>
                </div>
            </DialogListStyled>
        </div>);
}


export default DialogsList;