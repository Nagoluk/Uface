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
import {Tabs} from 'antd';
import {PhoneOutlined, ProfileOutlined, TranslationOutlined} from '@ant-design/icons';
import {UpdateContactForm} from './UpdateProfile/update-contact-form';

const {TabPane} = Tabs


const Setting: React.FC = () => {
    const profile = useSelector(getProfileSelector)
    const id = useSelector(getMyIdSelector)

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Setting';
        if (id !== null) {
            dispatch(getProfileThunkCreator(id));
        }

    }, [])

    if (profile === null) return <Preloader/>

    return (<UniversalWrap maxWidth={700}>
        <UniversalThemeComponent>
            <Tabs defaultActiveKey='profile' tabPosition={'top'}>
                <TabPane tab={
                    <div className={Set.tab}>
                        <ProfileOutlined/>
                        <span className={'tab'}>Profile</span>

                    </div>
                } key={'profile'}
                >
                    <UpdateProfileForm profile={profile}/>
                </TabPane>
                <TabPane tab={
                    <div>
                        <PhoneOutlined/>
                        <span className={'tab'}>Networks</span>
                    </div>

                } key={'contacts'}>
                    <UpdateContactForm profile={profile}/>
                </TabPane>
                {/*<TabPane tab={*/}
                {/*    <div>*/}
                {/*        <TranslationOutlined />*/}
                {/*        <span>Language</span>*/}
                {/*    </div>*/}
                {/*} key={'language'} >*/}
                {/*    <Radio.Group value={1}>*/}
                {/*        <Radio value={1}>UA</Radio>*/}
                {/*        <Radio value={2}>ENG</Radio>*/}
                {/*        <Radio value={3}>DK</Radio>*/}
                {/*        <Radio value={4}>DT</Radio>*/}
                {/*    </Radio.Group>*/}
                {/*</TabPane>*/}
            </Tabs>
        </UniversalThemeComponent>
    </UniversalWrap>)
}

export default Setting;





