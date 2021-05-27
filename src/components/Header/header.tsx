import React from 'react';
import headermod from './header.module.css';
import {NavLink} from 'react-router-dom';
import {SwitchButton} from '../Nav/adaptiveNav';
import Nav from '../Nav/nav';
import {Avatar} from '../assets/avatar/avatar';
import {VerticalAlign} from '../../styles/vertical.align';
import {HeaderStyle} from '../../styles/theme';

import {useDispatch, useSelector} from 'react-redux';
import {
    getIsLoginedSelector,
    getLoginSelector,
    getMyProfileSelector
} from '../../redux-state/selectors/login-selectors';

import {getNewMessagesCountSelector} from '../../redux-state/selectors/notification-selector';
import {logout} from '../../redux-state/loginReducer';
import {actionsApp} from '../../redux-state/appReducer';
import {AliwangwangOutlined, LogoutOutlined, BellOutlined, SwapOutlined} from '@ant-design/icons';


//todo: fdsf

const Header: React.FC = () => {
    const login = useSelector(getLoginSelector)
    const isLogined = useSelector(getIsLoginedSelector)
    const profile = useSelector(getMyProfileSelector)
    const newMessageCount = useSelector(getNewMessagesCountSelector)

    //Dispatch hooks

    const dispatch = useDispatch()

    return (<header className={headermod.Header}>
        <HeaderStyle>
            <div className={headermod.headerWrap}>
                <div className={headermod.leftside}>
                    <NavLink to="/profile"  className={headermod.logo}><h1><AliwangwangOutlined />Uface</h1></NavLink>
                    <div style={{'marginTop': '5px'}}>
                        <SwitchButton onClick={() => dispatch(actionsApp.ChangeThemeAC())}>
                            <SwapOutlined />
                        </SwitchButton>
                    </div>

                    <Nav/>
                </div>

                <div className={headermod.rightside}>

                    <div className={headermod.note + ' ' + headermod.hide + ' ' + headermod.messages}>
                        <BellOutlined />
                        {newMessageCount > 0 && <span className={headermod.newMessageCount}>{newMessageCount}</span>}
                    </div>

                    <h3>{isLogined ?
                        <VerticalAlign>{login}<Avatar link={profile ? profile.photos.small : null}
                                                      size={30}/></VerticalAlign> :
                        <NavLink exact={true} to="/login">Please sign in</NavLink>}</h3>

                    {isLogined && <div className={headermod.note + ' ' + headermod.logout} onClick={() => {
                        dispatch(logout());
                    }}>
                        <LogoutOutlined />
                    </div>}
                </div>
            </div>
        </HeaderStyle>
    </header>);
}

export default Header;