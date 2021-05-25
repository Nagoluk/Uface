import React from "react";
import DialogsListContainer from "./DialogList/DialogsListContainer";
import { withRouter, RouteComponentProps} from 'react-router-dom';
import styled from "styled-components";
import {useSelector} from 'react-redux';
import {getIsBlackSelector} from '../../redux-state/selectors/app-selectors';
import { MessageOutlined } from "@ant-design/icons";
import { Dialog } from "./Dialog/Dialog";

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

export const Dialogs: React.FC<BookDetailProps>= (props) => {
    const isBlack = useSelector(getIsBlackSelector)

    return (<DialogWrap>
                <DialogsListContainer black={isBlack}/>
                {props.match.params.userID ?
                    <Dialog/>
                    : <ChooseDialog>
                        <div>
                            <MessageOutlined />
                            <p>Choose Dialog</p>
                        </div>
                     </ChooseDialog>
                }
            </DialogWrap>)
}

export default withRouter(Dialogs)