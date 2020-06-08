import React, {useState} from 'react';
import headermod from "./header.module.css";
import {NavLink} from "react-router-dom";
import Navmod from "../Nav/nav.module.css";
import SearchContainer from "./Search/SearchContainer";
import styled from "styled-components";

const HeaderStyled = styled.header`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    transition: background .2s ease-in;

    
    && a {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
    
    & svg {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
    
    & h1 {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
    
    & h3 {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }
    
    & h1 svg {
        color: ${props => (props.black ? '#0078D4' : '#474B59;')};
    }
`

const switchButton = styled.button`
    background: none;
    outline: none;
    
    & svg {
        color: #0078D4;
        
    }
`




const Header = props => {
    let [menu, setMenu] = useState(false);

    return (
        <HeaderStyled black={props.black}>
            <div className={headermod.headerWrap + " " + (menu ? headermod.headerWrapShow : "")}>
                <div className={headermod.leftside}>
                    <NavLink to="/"><h1><i className="fas fa-dragon"></i>Uface</h1></NavLink>
                    <div style={{"margin-top": "5px"}}>
                        {props.black && <switchButton onClick={() => props.ChangeThemeAC()}>
                            <i className="far fa-moon"></i>
                        </switchButton>}

                        {!props.black && <switchButton onClick={() => props.ChangeThemeAC()}>
                            <i className="fas fa-sun"></i>
                        </switchButton>}
                    </div>

                </div>



                <div className={headermod.rightside}>
                    <SearchContainer black={props.black}/>

                    <div className={headermod.note  + " " + headermod.hide}>
                        <i className="fas fa-bell"></i>
                    </div>

                    <div className={headermod.note + " " + headermod.hide + " " + headermod.messages} >
                        <NavLink to='/dialogs' >
                            <i className="fas fa-envelope"></i>
                        </NavLink>
                        {props.newMessageCount ? <div className={headermod.newMessageCount}>{props.newMessageCount}</div> : null}
                    </div>

                    <h3>{props.isLogined ? props.login :  <NavLink exact={true} to="/login">Please sign in</NavLink>}</h3>

                    {props.isLogined && <div className={headermod.note + " " + headermod.logout} onClick={() => {
                        props.logout();
                    }}>
                        <i className="fas fa-power-off" title={"logout"}></i>
                    </div>}
                </div>
            </div>

            <AdaptiveMenu menuHandler={setMenu}
                          menu={menu}
                          isLogined={props.isLogined}
                          logout={props.logout}
                          newMessageCount={props.newMessageCount}
                          black={props.black}
                          ChangeThemeAC={props.ChangeThemeAC}
            />
        </HeaderStyled>


    );
}


const AdaptiveMenu = props => {

    return (<HeaderStyled className={headermod.adaptivemenu} black={props.black}>
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
            <NavLink to="/setting" activeClassName={Navmod.activeLink}><i
                className="fas fa-cogs"></i></NavLink>
        </div>

        <div className={headermod.adaptiveMenu}>
            {props.black && <switchButton onClick={() => props.ChangeThemeAC()}>
                <i className="far fa-moon"></i>
            </switchButton>}

            {!props.black && <switchButton onClick={() => props.ChangeThemeAC()}>
                <i className="fas fa-sun"></i>
            </switchButton>}
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

        {/*<div className={headermod.adaptiveMenu}>*/}
        {/*    <NavLink to="/search"><i className="fas fa-search"></i></NavLink>*/}
        {/*</div>*/}

        <div className={headermod.adaptiveMenu}>
            <NavLink to="/profile" activeClassName={Navmod.activeLink}><i
                className="fas fa-address-card"></i></NavLink>
        </div>
    </HeaderStyled>)
}

export default Header;