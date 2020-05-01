import React, {useState} from 'react';
import headermod from "./header.module.css";
import {NavLink} from "react-router-dom";
import Navmod from "../Nav/nav.module.css";
import SearchContainer from "./Search/SearchContainer";


const Header = props => {
    let [menu, setMenu] = useState(false);

    return (
        <header>
            <div className={headermod.headerWrap + " " + (menu ? headermod.headerWrapShow : "")}>
                <div className={headermod.leftside}>
                    <NavLink to="/"><h1><i className="fas fa-dragon"></i>Uface</h1></NavLink>
                </div>

                <div className={headermod.rightside}>
                    <SearchContainer/>

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

            <AdaptiveMenu menuHandler={setMenu} menu={menu} isLogined={props.isLogined} logout={props.logout} newMessageCount={props.newMessageCount}/>
        </header>


    );
}


const AdaptiveMenu = props => {

    return (<div className={headermod.adaptivemenu}>
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
            <NavLink to="/search"><i className="fas fa-search"></i></NavLink>
        </div>

        <div className={headermod.adaptiveMenu}>
            <NavLink to="/profile" activeClassName={Navmod.activeLink}><i
                className="fas fa-address-card"></i></NavLink>
        </div>
    </div>)
}

export default Header;