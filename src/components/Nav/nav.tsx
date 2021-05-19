import React from 'react';
import {NavLink} from 'react-router-dom';

import Navmod from './nav.module.css';
import {NavigationStyle} from '../../styles/theme';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {ProfileOutlined, IdcardOutlined, UsergroupAddOutlined, MessageOutlined, SettingOutlined} from '@ant-design/icons';

const Nav: React.FC = () => {
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

                <NavLink to="/setting" activeClassName={Navmod.activeLink}>
                    <li><SettingOutlined /></li>
                </NavLink>
            </ul>
        </NavigationStyle>
    </nav>);
}

export default Nav;