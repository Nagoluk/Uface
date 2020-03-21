import React from 'react';
import headermod from "./header.module.css";
import {NavLink} from "react-router-dom";
import Navmod from "../Nav/nav.module.css";
import Avatar from "../../img/Profile/avatar.png"

import SearchContainer from "./Search/SearchContainer";


const Header = props => {


    return (
        <header>
            <div className={headermod.headerWrap}>

                <div className={headermod.adaptivemenu}>
                    <div className={headermod.adaptiveMenu}>
                        <NavLink to='/dialogs/0' activeClassName={Navmod.activeLink}><i
                            className="fas fa-envelope"></i></NavLink>
                    </div>

                    <div className={headermod.adaptiveMenu}>
                        <NavLink to="/setting" activeClassName={Navmod.activeLink}><i
                            className="fas fa-cogs"></i></NavLink>
                    </div>

                    <div className={headermod.adaptiveMenu}>
                        <NavLink to="/news" activeClassName={Navmod.activeLink}><i
                            className="far fa-newspaper"></i></NavLink>
                    </div>

                    <div className={headermod.adaptiveMenu}>
                        <NavLink to="/music" activeClassName={Navmod.activeLink}><i
                            className="fas fa-headphones-alt"></i></NavLink>
                    </div>

                    <div className={headermod.adaptiveMenu}>
                        <NavLink to="/friends" activeClassName={Navmod.activeLink}><i
                            className="fas fa-user-friends"></i></NavLink>
                    </div>

                    <div className={headermod.adaptiveMenu}>
                        <NavLink to="/profile"><i className="fas fa-bell"></i></NavLink>
                    </div>

                    <div className={headermod.adaptiveMenu}>
                        <NavLink to="/profile" activeClassName={Navmod.activeLink}><i
                            className="fas fa-address-card"></i></NavLink>
                    </div>

                </div>

                <div className={headermod.leftside}>
                    <h1><i className="fas fa-dragon"></i>Uface</h1>
                </div>

                <div className={headermod.rightside}>
                    <SearchContainer/>


                    <div className={headermod.note}>
                        <i className="fas fa-bell"></i>
                    </div>


                    <div className={headermod.note}>
                        <NavLink to='/dialogs/0' activeClassName={Navmod.activeLink}><i
                            className="fas fa-envelope"></i></NavLink>
                    </div>


                    <h3>{props.isLogined ? props.login :  <NavLink exact={true} to="/login">Please sign in</NavLink>}</h3>

                    {props.isLogined && <div className={headermod.note + " " + headermod.logout} onClick={() => {
                        props.logout();
                    }}>
                        <i className="fas fa-power-off" title={"logout"}></i>
                    </div>}

                </div>
            </div>

        </header>


    );
}

export default Header;