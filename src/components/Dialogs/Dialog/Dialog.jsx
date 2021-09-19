import React, {useState} from 'react';
import MyPost from "../../Profile/MyPosts/MyPosts.module.css";
import DialogMod from "./DialogWithUser.module.css";
import {NavLink, useParams} from "react-router-dom";
import Avatar from "../../../img/Profile/avatar.png";
import {Messages} from "./Messages/Messages";
import styled from "styled-components";
import {CloseCircleOutlined, MessageOutlined, SendOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {getIsBlackSelector} from '../../../redux-state/selectors/app-selectors';
import {getDialogInfoSelector} from '../../../redux-state/selectors/message-selectors';
import {sendMessagesThunkCreator} from '../../../redux-state/messageReducer';
import NotFound from '../../404/notFound';
import TextareaAutosize from 'react-textarea-autosize';


const DialogStyled = styled.div`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    margin-left: 5px
`

const DialogHeader = styled.div`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    border-bottom: 1px solid ${props => (props.black ? '#3C3F41' : 'lightgray')};
    
    & h3 {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
 
    & h1 {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
    
    & .last {
        color: ${props => (props.black ? '#fff' : 'gray;')};
    }
`

const MessageEditor = styled.div`
    border-top: 1px solid ${props => (props.black ? '#3C3F41' : 'lightgray')};
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    
    & textarea{
        background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
        color: ${props => (props.black ? '#fff' : '#000')};
    }
    
    & svg {
        color: #0078D4;
    }
`

const ChooseDialog = styled.div`
    color: #fff;
    font-size: 24px;
    text-align: center;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #1890ff;
    
    & svg {
        margin-bottom: 10px;
        font-size: 4em;
    }
`
export const NoDialogSelected = (<ChooseDialog className={DialogMod.noDialog}>
                                    <div>
                                        <MessageOutlined />
                                        <p>Choose Dialog</p>
                                    </div>
                                </ChooseDialog>)


export const Dialog = () => {
    const dispatch = useDispatch()
    const {userID} = useParams()
    const [message, setMessageText] = useState('')

    const isBlack = useSelector(getIsBlackSelector)
    const dialogUserData = useSelector((state) => getDialogInfoSelector(state, userID))

    if(!userID) return NoDialogSelected

    if(!dialogUserData[0]) return <NotFound/>



    return (<DialogStyled className={DialogMod.dialogWithUser} black={isBlack}>
                <DialogHeader className={DialogMod.dialogHeader} black={isBlack}>
                    <img src={dialogUserData[0]?.photos.small || dialogUserData[0]?.photos.large || Avatar}
                         alt="avatar"
                         className={DialogMod.Dialogavatar}
                    />

                    <div>
                        <NavLink to={"/profile/"+userID}><h3>{dialogUserData[0].userName}</h3></NavLink>
                        <div className={DialogMod.status  + " last"}>
                            Was online: {dialogUserData[0]?.lastUserActivityDate.split("T").join(" ").slice(0, 16)}
                        </div>
                    </div>

                    <div className={DialogMod.backToDialogList}>
                        <NavLink to="/dialogs">
                            <CloseCircleOutlined />
                        </NavLink>
                    </div>
                </DialogHeader>

                <Messages dialogId={userID}/>


                <MessageEditor className={DialogMod.createNewMessage} black={isBlack}>
                    <TextareaAutosize name={"newMessage"} placeholder={"New message"}
                              value={message}
                              autoComplete={'off'} wrap={'hard'}
                              onKeyPress={event => {
                                  if(event.key === 'Enter' && message !== ''){
                                      event.preventDefault()
                                      dispatch(sendMessagesThunkCreator(userID, message))
                                      setMessageText('')
                                  }
                              }}
                              onChange={(e) => setMessageText(e.target.value)}
                              />

                    <div className={DialogMod.createNewMessageAcivities}>
                        <button
                            className={MyPost.button + " " + MyPost.send}
                            onClick={() =>{
                                setMessageText("")
                                dispatch(sendMessagesThunkCreator(userID, message))
                            }}
                            disabled={message.trim() === ""}><SendOutlined /></button>
                    </div>
                </MessageEditor>
             </DialogStyled>);

};
