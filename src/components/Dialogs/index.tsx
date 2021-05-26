import React, {useEffect} from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from 'react-redux';
import {getIsBlackSelector} from '../../redux-state/selectors/app-selectors';

import { Dialog } from "./Dialog/Dialog";
import {getIsDialogsFetching, getDialogsSelector} from '../../redux-state/selectors/message-selectors';
import Preloader from '../assets/preloader/Preloader';
import DialogsList from "./DialogList/DialogsList";
import {getDialogsThunkCreator} from '../../redux-state/messageReducer';


const DialogWrap = styled.div`
    display: flex;
`


export const Dialogs: React.FC = () => {
    const dispatch = useDispatch()
    const isBlack = useSelector(getIsBlackSelector)
    const isDialogFetching = useSelector(getIsDialogsFetching)
    const dialogs = useSelector(getDialogsSelector)


    useEffect(() =>{
        dispatch(getDialogsThunkCreator())
    }, [])

    if(dialogs === null || isDialogFetching) return <Preloader/>

    return (<DialogWrap>
                <DialogsList black={isBlack} dialogs={dialogs}/>
                <Dialog/>
            </DialogWrap>)
}

export default Dialogs