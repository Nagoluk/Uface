import React, {useState} from 'react';
import headermod from "./header.module.css";
import {NavLink} from "react-router-dom";
import SearchContainer from "./Search/SearchContainer";
import styled from "styled-components";
import {SwitchButton} from "../Nav/adaptiveNav";
import Nav from "../Nav/nav";

export const HeaderStyled = styled.header`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    transition: background .2s ease-in;

    
    && a {
        color: ${props => (props.black ? '#ffffff' : '#474B59;')};
    }

    & a.active svg{
        color: #0078D4;
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


const Header = props => {
    let [menu, setMenu] = useState(false);

    return (
        <HeaderStyled black={props.black}>
            <div className={headermod.headerWrap + " " + (menu ? headermod.headerWrapShow : "")}>
                <div className={headermod.leftside}>
                    <NavLink to="/"><h1><i className="fas fa-dragon"></i>Uface</h1></NavLink>
                    <div style={{"margin-top": "5px"}}>
                        {props.black && <SwitchButton onClick={() => props.ChangeThemeAC()}>
                            <i className="far fa-moon"></i>
                        </SwitchButton>}

                        {!props.black && <SwitchButton onClick={() => props.ChangeThemeAC()}>
                            <i className="fas fa-sun"></i>
                        </SwitchButton>}
                    </div>

                    <Nav black={props.black} />
                </div>

                <div className={headermod.rightside}>
                    <SearchContainer black={props.black}/>

                    <div className={headermod.note  + " " + headermod.hide}>
                        <i className="fas fa-bell"></i>
                    </div>

                    <h3>{props.isLogined ? props.login :  <NavLink exact={true} to="/login">Please sign in</NavLink>}</h3>

                    {props.isLogined && <div className={headermod.note + " " + headermod.logout} onClick={() => {
                        props.logout();
                    }}>
                        <i className="fas fa-power-off" title={"logout"}></i>
                    </div>}
                </div>
            </div>
        </HeaderStyled>);
}

export default Header;