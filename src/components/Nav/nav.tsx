import React from 'react';
import Navmod from "./nav.module.css";
import {NavLink} from "react-router-dom";
import styled from "styled-components";


const NavigationStyle = styled.nav<any>`
        & div a{
               background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
               color: ${props => (props.black ? '#fff' : '#3C3F41')};
               border-right: ${props => (props.black ? '1px solid #3C3F41' : '1px solid lightgray')};
               transition: all .2s ease-in;
              
        }
        
        & div a:first-child {
                border-left: ${props => (props.black ? '1px solid #3C3F41' : '1px solid lightgray')};
        }
        
        

        & div a.active{
            background: ${props => (props.black ? '#202020' : '#f2f2f2')};
    
        } 
`

const Followers = styled.div<any>`
               background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
               color: ${props => (props.black ? '#fff' : '#3C3F41')};
               border: ${props => (props.black ? '1px solid #3C3F41' : '1px solid lightgray')};
               transition: all .2s ease-in;

`

type NavPropsType = {
    black: boolean
}

const Nav: React.FC<NavPropsType> = props => {

    return (
        <NavigationStyle black={props.black}>
            <div className={Navmod.navigation}>
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
            </div>
        </NavigationStyle>
    );
}


export default Nav;