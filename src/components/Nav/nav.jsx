import React from 'react';
import Navmod from "./nav.module.css";
import {NavLink} from "react-router-dom";
import photo from "../../img/Profile/avatar.png";


const Nav = () => {

    return (
        <nav>
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

            <div className={Navmod.friends}>
                <h3>Followers</h3>
                <ul>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                </ul>
            </div>

            <div className={Navmod.friends}>
                <h3>Followed</h3>
                <ul>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                    <li><img src={photo} alt="f"/></li>
                </ul>
            </div>
        </nav>
    );
}


export default Nav;