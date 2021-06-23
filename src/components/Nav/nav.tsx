import React from 'react';
import {NavLink} from 'react-router-dom';

import Navmod from './nav.module.css';
import {NavigationStyle} from '../../styles/theme';
import {IdcardOutlined, UsergroupAddOutlined, MessageOutlined, SettingOutlined, AliwangwangOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import {getIsLoginedSelector} from '../../redux-state/selectors/login-selectors';

const Nav: React.FC = () => {
    const isLogined = useSelector(getIsLoginedSelector)

    if(!isLogined) return null

    return (<nav>
        <NavigationStyle className={Navmod.navigation}>
            <ul>
                <NavLink to="/profile" activeClassName={Navmod.activeLink}>
                    <li><IdcardOutlined /></li>
                </NavLink>

                <NavLink to="/friends" activeClassName={Navmod.activeLink}>
                    <li><UsergroupAddOutlined /></li>
                </NavLink>

                <NavLink to="/dialogs" activeClassName={Navmod.activeLink}>
                    <li><MessageOutlined /></li>
                </NavLink>

                <NavLink to="/chat" activeClassName={Navmod.activeLink}>
                    <li><AliwangwangOutlined /></li>
                </NavLink>

                <NavLink to="/setting" activeClassName={Navmod.activeLink}>
                    <li><SettingOutlined /></li>
                </NavLink>
            </ul>
        </NavigationStyle>
    </nav>);
}

export default Nav;