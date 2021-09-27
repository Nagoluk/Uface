import React, {useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom';

import styled from 'styled-components';
import headermod from './adaptiveNav.module.css';
import Navmod from './nav.module.css';

import {AdaptiveNav, UniversalThemeComponent} from '../../styles/theme'
import {useDispatch, useSelector} from 'react-redux';
import {getIsLoginedSelector, getMyProfileSelector} from '../../redux-state/selectors/login-selectors';
import {getNewMessagesCountSelector} from '../../redux-state/selectors/notification-selector';
import { logout } from '../../redux-state/loginReducer';
import {actionsApp} from '../../redux-state/appReducer';
import {
    IdcardOutlined,
    LogoutOutlined, MenuUnfoldOutlined,
    MessageOutlined,
    SettingOutlined, SwapOutlined,
    UsergroupAddOutlined,
    AliwangwangOutlined
} from '@ant-design/icons';
import {Avatar} from '../assets/avatar/avatar';
import AvatarImg from '../../img/Profile/avatar.png';

export const SwitchButton = styled.button`
    background: none;
    outline: none;
    border: none;
    
    & svg {
        color: #0078D4;
    }
`
export const FullScreenMenu: React.FC<{setIsFullScreen: Function}> = ({setIsFullScreen}) => {
    const profile = useSelector(getMyProfileSelector)
    const newMessageCount = useSelector(getNewMessagesCountSelector)
    const dispatch = useDispatch()

    return <UniversalThemeComponent className={headermod.fullScreen}>
                <div className={headermod.fullScreenWrap}>
                    <div>
                        <h2>{profile?.fullName}</h2>
                        <Avatar link={profile?.photos.small || AvatarImg} size={70}/>
                        <MenuUnfoldOutlined
                            className={headermod.closeFullScreen}
                            onClick={() => setIsFullScreen(false)}
                        />
                    </div>

                    <div className={headermod.fullScreenMenuItems} >
                        <div className={headermod.adaptiveMenu} onClick={() => setIsFullScreen(false)}>
                            <NavLink to="/profile" activeClassName={Navmod.activeLink}>
                                <IdcardOutlined />
                                Profile
                            </NavLink>
                        </div>

                        <div className={headermod.adaptiveMenu} onClick={() => setIsFullScreen(false)}>
                            <NavLink to="/friends" activeClassName={Navmod.activeLink}>
                                <UsergroupAddOutlined />
                                Users
                            </NavLink>
                        </div>

                        <div className={headermod.adaptiveMenu + ' ' +
                        headermod.messages
                        } onClick={() => setIsFullScreen(false)}>
                            <NavLink to='/dialogs'>
                                <MessageOutlined />
                                Messages

                            </NavLink>
                            {newMessageCount ? <div className={headermod.newMessageCount  + ' ' + headermod.newMessageCountFullscreenMenu}><span>{newMessageCount}</span></div> : null}
                        </div>

                        <div className={headermod.adaptiveMenu} onClick={() => setIsFullScreen(false)}>
                            <NavLink to="/chat" activeClassName={Navmod.activeLink}>
                                <AliwangwangOutlined />
                                Common chat
                            </NavLink>
                        </div>

                        <div className={headermod.adaptiveMenu} onClick={() => setIsFullScreen(false)}>
                            <NavLink to="/setting" activeClassName={Navmod.activeLink}>
                                <SettingOutlined />
                                Settings
                            </NavLink>
                        </div>

                        <div className={headermod.adaptiveMenu} onClick={() => setIsFullScreen(false)}>
                            <SwitchButton onClick={() => dispatch(actionsApp.ChangeThemeAC())}>
                                <SwapOutlined /> Change theme
                            </SwitchButton>
                        </div>

                        <div className={headermod.logout} onClick={() => dispatch(logout())}>
                            <LogoutOutlined/> Logout
                        </div>
                    </div>
                </div>
           </UniversalThemeComponent>
}

export const AdaptiveMenu: React.FC = () => {
    const isLogined = useSelector(getIsLoginedSelector)
    const newMessageCount = useSelector(getNewMessagesCountSelector)
    const [isFullScreen, setIsFullScreen] = useState(false)

    useEffect(() => {
        if(isFullScreen) {
            document.body.classList.add('menu-open');
        }else {
            document.body.classList.remove('menu-open');
        }
    }, [isFullScreen])

    if(!isLogined) return null

    return (<AdaptiveNav className={headermod.adaptivemenu}>
        {isFullScreen && <FullScreenMenu setIsFullScreen={setIsFullScreen}/>}

        <div className={headermod.adaptiveMenu} >
            <NavLink to="/friends" activeClassName={Navmod.activeLink}>
                <UsergroupAddOutlined /></NavLink>
        </div>

        <div className={headermod.adaptiveMenu + ' ' + headermod.messages}>
            <NavLink to='/dialogs'>
                <MessageOutlined />
            </NavLink>
            {newMessageCount ? <div className={headermod.newMessageCount + ' ' + headermod.newMessageCountAdaptiveMenu}><span>{newMessageCount}</span></div> : null}
        </div>

        <div className={headermod.adaptiveMenu}>
            <NavLink to="/profile" activeClassName={Navmod.activeLink}><IdcardOutlined /></NavLink>
        </div>

        <div className={headermod.adaptiveMenu + " " + headermod.menu} onClick={() => setIsFullScreen(true)}>
            <MenuUnfoldOutlined />
        </div>
    </AdaptiveNav>)
}
