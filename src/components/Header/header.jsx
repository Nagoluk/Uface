import React from 'react';
import headermod from "./header.module.css";
import {NavLink} from "react-router-dom";
import Navmod from "../Nav/nav.module.css";


const Header = props => {


    return (
        <header>
            <div className={headermod.headerWrap}>

                <div className={headermod.adaptivemenu}>
                    <div  className={headermod.adaptiveMenu}>
                        <NavLink to='/dialogs/0' activeClassName={Navmod.activeLink}><i
                            className="fas fa-envelope"></i></NavLink>
                    </div>

                    <div  className={headermod.adaptiveMenu}>
                        <NavLink to="/setting" activeClassName={Navmod.activeLink}><i className="fas fa-cogs"></i></NavLink>
                    </div>

                    <div  className={headermod.adaptiveMenu}>
                        <NavLink to="/news" activeClassName={Navmod.activeLink}><i className="far fa-newspaper"></i></NavLink>
                    </div>

                    <div  className={headermod.adaptiveMenu}>
                        <NavLink to="/music" activeClassName={Navmod.activeLink}><i
                            className="fas fa-headphones-alt"></i></NavLink>
                    </div>

                    <div  className={headermod.adaptiveMenu}>
                        <NavLink to="/friends" activeClassName={Navmod.activeLink}><i
                            className="fas fa-user-friends"></i></NavLink>
                    </div>

                    <div  className={headermod.adaptiveMenu}>
                        <NavLink to="/profile"><i className="fas fa-bell"></i></NavLink>
                    </div>

                    <div  className={headermod.adaptiveMenu}>
                        <NavLink to="/profile" activeClassName={Navmod.activeLink}><i
                            className="fas fa-address-card"></i></NavLink>
                    </div>

                </div>

                <div className={headermod.leftside}>
                    <h1><i className="fas fa-dragon"></i>Uface</h1>
                </div>

                <div className={headermod.rightside}>
                    <div className={headermod.input}>
                        <input type="text" placeholder={"Search here"}/>
                        <button><i className="fas fa-search"></i></button>
                    </div>

                    <div className={headermod.note}>
                        <i className="fas fa-bell"></i>
                    </div>


                    <div  className={headermod.note}>
                        <NavLink to='/dialogs/0' activeClassName={Navmod.activeLink}><i
                            className="fas fa-envelope"></i></NavLink>
                    </div>
                    <h3>{props.isLogined ? props.login :"Please sign up"}</h3>
                    <div className={headermod.profile_avatar}>
                        <img
                            src="data:image/jpeg;base64,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"
                            alt="profile-img"/>
                    </div>

                </div>
            </div>

        </header>


    );
}

export default Header;