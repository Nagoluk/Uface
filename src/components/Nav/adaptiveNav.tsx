import React from 'react'
import headermod from "./adaptiveNav.module.css";
import {NavLink} from "react-router-dom";
import Navmod from "./nav.module.css";
import styled from "styled-components";

type Switch = {black: boolean}
const AdaptiveNav = styled.div<Switch>`
 background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
 border-top: 1px solid ${props => (props.black) ? "#3C3F41" : "lightgray"};
 
 & svg {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
 }
`


export const SwitchButton = styled.button`
    background: none;
    outline: none;
    border: none;
    
    & svg {
        color: #0078D4;
        
    }
`

type Props = {
    black: boolean
    newMessageCount: number
    isLogined: Function
    logout: Function
    ChangeThemeAC: Function
};

export const AdaptiveMenu: React.FC<Props> = props => {

    return (<AdaptiveNav className={headermod.adaptivemenu} black={props.black}>
        {props.isLogined && <div className={headermod.note + " " + headermod.logout} onClick={() => {
            props.logout();
        }}>
            <i className="fas fa-power-off" title={"logout"}></i>
        </div>}

        {!props.isLogined && <div className={headermod.note}>
            <NavLink to="/login">
                <i className="fas fa-sign-in-alt" title={"logout"}></i>
            </NavLink>
        </div>}


        <div className={headermod.adaptiveMenu}>
            {props.black && <SwitchButton onClick={() => props.ChangeThemeAC()}>
                <i className="far fa-moon"></i>
            </SwitchButton>}

            {!props.black && <SwitchButton onClick={() => props.ChangeThemeAC()}>
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

        <div className={headermod.adaptiveMenu + " "  + headermod.messages}>
            <NavLink to='/dialogs'>
                <i className="fas fa-envelope"></i>
            </NavLink>
            {props.newMessageCount ? <div className={headermod.newMessageCount}>{props.newMessageCount}</div> : null}
        </div>

        <div className={headermod.adaptiveMenu}>
            <NavLink to="/profile" activeClassName={Navmod.activeLink}><i
                className="fas fa-address-card"></i></NavLink>
        </div>
    </AdaptiveNav>)
}
