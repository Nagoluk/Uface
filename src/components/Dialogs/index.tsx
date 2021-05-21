import React from "react";
import DialogsListContainer from "./DialogList/DialogsListContainer";
import DialogContainer from "./Dialog/DialogContainer";
import { withRouter, RouteComponentProps} from 'react-router-dom';
import styled from "styled-components";
import LoginHoc from '../../hoc/loginHoc';

type BookDetailParams = {
    userID: string; // parameters will always be a string (even if they are numerical)
};

type BookDetailProps = RouteComponentProps<BookDetailParams>

const DialogWrap = styled.div`
    display: flex;
`

const ChooseDialog = styled.div`
    color: #fff;
    font-size: 24px;
    text-align: center;
    
`

export const Dialogs: React.FC<BookDetailProps>= (props) => {

    return (<DialogWrap>
                <DialogsListContainer black={true}/>
                {props.match.params.userID ? <DialogContainer black={true}/> : <ChooseDialog>Choose Dialog</ChooseDialog>}
            </DialogWrap>)
}

export default withRouter(LoginHoc(Dialogs))