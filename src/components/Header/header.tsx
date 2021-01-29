import React from 'react';
import headermod from "./header.module.css";
import {NavLink} from "react-router-dom";
import SearchContainer from "./Search/SearchContainer";
import {SwitchButton} from "../Nav/adaptiveNav";
import Nav from "../Nav/nav";
import {Avatar} from "../assets/avatar/avatar";
import {VerticalAlign} from "../../styles/vertical.align";
import {HeaderStyle} from "../../styles/theme";
import {HeaderProps} from "./headerContainer";

//todo: fdsf

const Header: React.FC<HeaderProps> = (props) => {

    return (<header>
                <HeaderStyle>
                    <div className={headermod.headerWrap}>
                        <div className={headermod.leftside}>
                            <NavLink to="/"><h1><i className="fas fa-dragon"></i>Uface</h1></NavLink>
                            <div style={{"marginTop": "5px"}}>
                                {props.black && <SwitchButton onClick={() => props.ChangeThemeAC()}>
                                    <i className="far fa-moon"></i>
                                </SwitchButton>}

                                {!props.black && <SwitchButton onClick={() => props.ChangeThemeAC()}>
                                    <i className="fas fa-sun"></i>
                                </SwitchButton>}
                            </div>

                            <Nav/>
                        </div>

                        <div className={headermod.rightside}>
                            <SearchContainer/>

                            <div className={headermod.note  + " " + headermod.hide}>
                                <i className="fas fa-bell"></i>
                            </div>

                            <h3>{props.isLogined ? <VerticalAlign>{props.login}<Avatar link={props.profile ? props.profile.photos.small : null} size={30}/></VerticalAlign> :  <NavLink exact={true} to="/login">Please sign in</NavLink>}</h3>

                            {props.isLogined && <div className={headermod.note + " " + headermod.logout} onClick={() => {
                                props.logout();
                            }}>
                                <i className="fas fa-power-off" title={"logout"}></i>
                            </div>}
                        </div>
                    </div>
                </HeaderStyle>
            </header>);
}

export default Header;