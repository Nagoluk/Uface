import React from 'react';
import Set from './setting.module.css';
import UpdateProfile from "./UpdateProfile/UpdateProfile";
import styled from "styled-components";
import {UniversalWrap} from "../../styles/wrap.styles";

const SettingItem = styled.div`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    color: ${props => (props.black ? '#fff' : '')};
    border: 1px solid ${props => (props.black ? '#2B2B2B' : 'lightgray')};
    transition: all .2s ease-in;
    
`

const Setting = (props) => {
    return (<UniversalWrap className={Set.wrap} maxWidth={500}>
                <SettingItem className={Set.item} black={props.black}>
                    <UpdateProfile profile={props.profile} putUserData={props.putUserDataThunkCreator} isUpload={props.isUploadProfile}/>
                </SettingItem>

                {/* <div className={Set.item}>
                    <UpdateContacts profile={props.profile} putUserData={props.putUserDataThunkCreator}/>
                </div> */}
            </UniversalWrap>)
}

export default Setting;





