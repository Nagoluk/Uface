import React, {useEffect} from 'react';

import Set from './setting.module.css';
import {UniversalWrap} from '../../styles/wrap.styles';
import {SettingStyled} from '../../styles/theme';

import {useDispatch, useSelector} from 'react-redux';
import {getProfileErrorSelector, getProfileSelector} from '../../redux-state/selectors/profile-selector';
import {getMyIdSelector} from '../../redux-state/selectors/login-selectors';
import {getProfileThunkCreator} from '../../redux-state/profileReducer';
import Preloader from '../assets/preloader/Preloader';
import {UpdateProfileForm} from './UpdateProfile/update-profile-form';
import {Tabs} from 'antd';
import {PhoneOutlined, ProfileOutlined} from '@ant-design/icons';
import {UpdateContactForm} from './UpdateProfile/update-contact-form';
import {NetworkError} from '../common/NetworkError/NetworkError';


const {TabPane} = Tabs


const Setting: React.FC = () => {
    const profile = useSelector(getProfileSelector)
    const id = useSelector(getMyIdSelector)
    const error = useSelector(getProfileErrorSelector)

    const dispatch = useDispatch()


    useEffect(() => {
        document.title = 'Setting';
        if (id !== null) {
            dispatch(getProfileThunkCreator(id));
        }

    }, [dispatch, id])

    if(error && id !== null) {
        return <NetworkError refresh={() =>  dispatch(getProfileThunkCreator(id))}/>
    }

    if (profile === null) return <Preloader/>

    return (<UniversalWrap maxWidth={700}>
        <SettingStyled >
            <Tabs defaultActiveKey='profile' tabPosition={'left'} className={Set.wrap}>
                <TabPane tab={
                    <div className={Set.tab}>
                        <ProfileOutlined/>

                    </div>
                } key={'profile'}
                >
                    <UpdateProfileForm profile={profile}/>
                </TabPane>
                <TabPane tab={
                    <div className={Set.tab}>
                        <PhoneOutlined/>
                    </div>

                } key={'contacts'}>
                    <UpdateContactForm profile={profile}/>
                </TabPane>
            </Tabs>
        </SettingStyled>
    </UniversalWrap>)
}

export default Setting;





