import React from 'react';
import Navmod from "./nav.module.css";
import {NavLink} from "react-router-dom";
import photo from "../../img/NAV/photo.png";

const Nav = () => {
    return (
        <nav>
            <div className={Navmod.navigation}>

                <ul>
                    <li>
                        <NavLink to="/profile" activeClassName={Navmod.activeLink}><i
                            className="fas fa-address-card ItemMenu"></i> <span>Profile</span></NavLink></li>
                    <li><NavLink to="/friends" activeClassName={Navmod.activeLink}><i
                        className="fas fa-user-friends"></i><span>Users</span> </NavLink></li>
                    <li><NavLink to="/groups" activeClassName={Navmod.activeLink}><i className="far fa-thumbs-up"></i> <span>Groups</span> </NavLink>
                    </li>
                    <li><NavLink to="/news" activeClassName={Navmod.activeLink}><i className="far fa-newspaper"></i> <span>News</span> </NavLink>
                    </li>
                    <li><NavLink to="/music" activeClassName={Navmod.activeLink}><i
                        className="fas fa-headphones-alt"></i> <span>Music</span> </NavLink></li>
                    <li><NavLink to="/setting" activeClassName={Navmod.activeLink}><i className="fas fa-cogs"></i> <span>Setting</span> </NavLink>
                    </li>
                </ul>
            </div>

            <div className={Navmod.friends}>
                <h3>Best friends</h3>
                <ul>
                    <li><img src="http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg" alt="f"/></li>
                    <li><img src="http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg" alt="f"/></li>
                    <li><img src="http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg" alt="f"/></li>
                    <li><img src="http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg" alt="f"/></li>
                </ul>

            </div>


            <div className={Navmod.friends}>
                <h3>Best groups</h3>
                <ul>
                    <li><img src="http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg" alt="f"/></li>
                    <li><img src="http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg" alt="f"/></li>
                    <li><img src="http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg" alt="f"/></li>
                    <li><img src="http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg" alt="f"/></li>
                </ul>

            </div>


            <div className={Navmod.friends + " " + Navmod.photos}>
                <h3>Photos</h3>
                <ul>
                    <li><img src={photo} alt="" /></li>
                    <li><img src={photo} alt=""/></li>
                    <li><img src={photo} alt=""/></li>
                    <li><img src={photo} alt=""/></li>
                    <li><img src={photo} alt=""/></li>
                    <li><img src={photo} alt=""/></li>
                    <li><img src={photo} alt=""/></li>
                    <li><img src={photo} alt=""/></li>
                    <li><img src={photo} alt=""/></li>
                </ul>

            </div>





</nav>
);
}

export default Nav;