import React from 'react'
import {NavLink} from 'react-router-dom';

import styled from 'styled-components';
import headermod from './adaptiveNav.module.css';
import Navmod from './nav.module.css';

import {AdaptiveNav} from '../../styles/theme'
import {useDispatch, useSelector} from 'react-redux';
import {getIsLoginedSelector} from '../../redux-state/selectors/login-selectors';
import {getIsBlackSelector} from '../../redux-state/selectors/app-selectors';
import {getNewMessagesCountSelector} from '../../redux-state/selectors/notification-selector';
import { logout } from '../../redux-state/loginReducer';
import {actionsApp} from '../../redux-state/appReducer';

export const SwitchButton = styled.button`
    background: none;
    outline: none;
    border: none;
    
    & svg {
        color: #0078D4;
    }
`

export const AdaptiveMenu: React.FC = props => {
    const isLogined = useSelector(getIsLoginedSelector)
    const black = useSelector(getIsBlackSelector)
    const newMessageCount = useSelector(getNewMessagesCountSelector)

    const dispatch = useDispatch()

    return (<AdaptiveNav className={headermod.adaptivemenu}>
        {isLogined && <div className={headermod.note + ' ' + headermod.logout} onClick={() => {
           dispatch(logout());
        }}>
            <i className="fas fa-power-off" title={'logout'}></i>
        </div>}

        {!isLogined && <div className={headermod.note}>
            <NavLink to="/login">
                <i className="fas fa-sign-in-alt" title={'logout'}></i>
            </NavLink>
        </div>}

        <div className={headermod.adaptiveMenu}>
            {black && <SwitchButton onClick={() => dispatch(actionsApp.ChangeThemeAC())}>
                <i className="far fa-moon"></i>
            </SwitchButton>}

            {!black && <SwitchButton onClick={() => dispatch(actionsApp.ChangeThemeAC())}>
                <i className="fas fa-sun"></i>
            </SwitchButton>}
        </div>

        <div className={headermod.adaptiveMenu}>
            <NavLink to="/setting" activeClassName={Navmod.activeLink}><i
                className="fas fa-cogs"></i></NavLink>
        </div>

        <div className={headermod.adaptiveMenu}>
            <NavLink to="/friends" activeClassName={Navmod.activeLink}><i
                className="fas fa-user-friends"></i></NavLink>
        </div>

        <div className={headermod.adaptiveMenu + ' ' + headermod.messages}>
            <NavLink to='/dialogs'>
                <i className="fas fa-envelope"></i>
            </NavLink>
            {newMessageCount ? <div className={headermod.newMessageCount}>{newMessageCount}</div> : null}
        </div>

        <div className={headermod.adaptiveMenu}>
            <NavLink to="/profile" activeClassName={Navmod.activeLink}><i
                className="fas fa-address-card"></i></NavLink>
        </div>
    </AdaptiveNav>)
}
