import React from 'react';
import UpdateProfile from "./UpdateProfile/UpdateProfile";

import Set from './setting.module.css';
import {UniversalWrap} from "../../styles/wrap.styles";
import {UniversalThemeComponent} from "../../styles/theme";


const Setting = (props) => {
    return (<UniversalWrap className={Set.wrap} maxWidth={500}>
                <UniversalThemeComponent className={Set.item}>
                    <UpdateProfile profile={props.profile} putUserData={props.putUserDataThunkCreator} isUpload={props.isUploadProfile}/>
                </UniversalThemeComponent>

                {/* <div className={Set.item}>
                    <UpdateContacts profile={props.profile} putUserData={props.putUserDataThunkCreator}/>
                </div> */}
            </UniversalWrap>)
}

export default Setting;





