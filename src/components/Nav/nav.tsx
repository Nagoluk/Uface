import React from 'react';
import Navmod from "./nav.module.css";
import {NavLink} from "react-router-dom";
import photo from "../../img/Profile/avatar.png";
import styled from "styled-components";


const NavigationStyle = styled.nav<any>`
        & div a{
               background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
               color: ${props => (props.black ? '#fff' : '#3C3F41')};
               border: ${props => (props.black ? '1px solid #3C3F41' : '1px solid lightgray')};
               transition: all .2s ease-in;
              
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
                        <li><i className="fas fa-address-card ItemMenu"></i> <span>Profile</span></li>
                    </NavLink>

                    <NavLink to="/friends" activeClassName={Navmod.activeLink}>
                        <li><i className="fas fa-user-friends"></i><span>Users</span></li>
                    </NavLink>

                    <NavLink to="/groups" activeClassName={Navmod.activeLink}>
                        <li><i className="far fa-thumbs-up"></i> <span>Groups</span></li>
                    </NavLink>

                    <NavLink to="/news" activeClassName={Navmod.activeLink}>
                        <li><i className="far fa-newspaper"></i> <span>News</span></li>
                    </NavLink>

                    <NavLink to="/music" activeClassName={Navmod.activeLink}>
                        <li><i className="fas fa-headphones-alt"></i> <span>Music</span></li>
                    </NavLink>

                    <NavLink to="/setting" activeClassName={Navmod.activeLink}>
                        <li><i className="fas fa-cogs"></i> <span>Setting</span></li>
                    </NavLink>
                </ul>
            </div>

            <Followers className={Navmod.friends} black={props.black}>
                <h3>Followers</h3>
                <ul>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                </ul>
            </Followers>

            <Followers className={Navmod.friends} black={props.black}>
                <h3>Followed</h3>
                <ul>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                </ul>
            </Followers>
        </NavigationStyle>
    );
}


export default Nav;