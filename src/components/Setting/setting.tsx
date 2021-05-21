import React, {useEffect} from 'react';


import Set from './setting.module.css';
import {UniversalWrap} from '../../styles/wrap.styles';
import {UniversalThemeComponent} from '../../styles/theme';


import {useDispatch, useSelector} from 'react-redux';
import {getProfileSelector} from '../../redux-state/selectors/profile-selector';
import {getMyIdSelector} from '../../redux-state/selectors/login-selectors';
import {getProfileThunkCreator} from '../../redux-state/profileReducer';
import Preloader from '../assets/preloader/Preloader';
import {UpdateProfileForm} from './UpdateProfile/update-profile-form';
import {Tabs, Radio} from 'antd';
import {PhoneOutlined, ProfileOutlined, TranslationOutlined} from '@ant-design/icons';
import {UpdateContactForm} from './UpdateProfile/update-contact-form';
import {useTranslation} from 'react-i18next';
import Styles from './setting.module.css';
import i18next from 'i18next';



const {TabPane} = Tabs


const Setting: React.FC = () => {
    const profile = useSelector(getProfileSelector)
    const id = useSelector(getMyIdSelector)

    const dispatch = useDispatch()
    const {t} = useTranslation()

    useEffect(() => {
        document.title = 'Setting';
        if (id !== null) {
            dispatch(getProfileThunkCreator(id));
        }

    }, [])

    const onChange = (e: any) => {
        console.log(e.target.value)
        i18next.changeLanguage(e.target.value);
    };

    if (profile === null) return <Preloader/>

    return (<UniversalWrap maxWidth={700}>
        <UniversalThemeComponent >
            <Tabs defaultActiveKey='profile' tabPosition={'bottom'} className={Set.wrap}>
                <TabPane tab={
                    <div className={Set.tab}>
                        <ProfileOutlined/>
                        <span className={'tab'}>{t('settings.profile')}</span>

                    </div>
                } key={'profile'}
                >
                    <UpdateProfileForm profile={profile}/>
                </TabPane>
                <TabPane tab={
                    <div>
                        <PhoneOutlined/>
                        <span className={'tab'}>{t('settings.contacts')}</span>
                    </div>

                } key={'contacts'}>
                    <UpdateContactForm profile={profile}/>
                </TabPane>
                <TabPane tab={
                    <div>
                        <TranslationOutlined />
                        <span>{t('settings.languages')}</span>
                    </div>
                } key={'language'} >
                    <UniversalThemeComponent className={Styles.item}>
                        <h2>{t('settings.languages')}</h2>
                        <br/>
                        <Radio.Group onChange={onChange} value={i18next.languages[0]}>
                            <Radio value={'eng'}>English</Radio>
                            <Radio value={'ua'}>Українська</Radio>
                        </Radio.Group>
                    </UniversalThemeComponent>
                </TabPane>
            </Tabs>
        </UniversalThemeComponent>
    </UniversalWrap>)
}

export default Setting;





