import React from 'react';
import {NavLink} from 'react-router-dom';

import Navmod from './nav.module.css';
import {NavigationStyle} from '../../styles/theme';

const Nav: React.FC = () => {
    return (<nav>
                <NavigationStyle className={Navmod.navigation}>
                    <ul>
                        <NavLink to="/profile" activeClassName={Navmod.activeLink}>
                            <li><i className="fas fa-address-card ItemMenu"></i></li>
                        </NavLink>

                        <NavLink to="/friends" activeClassName={Navmod.activeLink}>
                            <li><i className="fas fa-user-friends"></i></li>
                        </NavLink>

                        <NavLink to="/dialogs" activeClassName={Navmod.activeLink}>
                            <li><i className="fas fa-envelope"></i></li>
                        </NavLink>

                        <NavLink to="/setting" activeClassName={Navmod.activeLink}>
                            <li><i className="fas fa-cogs"></i></li>
                        </NavLink>
                    </ul>
                </NavigationStyle>
            </nav>);
}

export default Nav;