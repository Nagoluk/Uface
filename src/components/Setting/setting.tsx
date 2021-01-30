import React from 'react';
import UpdateProfile from './UpdateProfile/UpdateProfile';

import Set from './setting.module.css';
import {UniversalWrap} from '../../styles/wrap.styles';
import {UniversalThemeComponent} from '../../styles/theme';
import {SettingPropsType} from './settingContainer';


const Setting: React.FC<SettingPropsType> = (props) => {
    return (<UniversalWrap className={Set.wrap} maxWidth={500}>
        <UniversalThemeComponent className={Set.item}>
            {/*<UpdateProfile profile={props.profile} */}
            {/*               putUserDataThunkCreator={props.putUserDataThunkCreator} */}
            {/*               isUploadProfile={props.isUploadProfile}/>*/}
        </UniversalThemeComponent>

        <div className={Set.item}>
            {/*<UpdateContacts profile={props.profile} putUserData={props.putUserDataThunkCreator}/>*/}
        </div>
    </UniversalWrap>)
}

export default Setting;





