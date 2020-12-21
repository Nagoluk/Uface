import React from "react";
import UsersStlyes from "./Users.module.css";
import AvatarImg from "../../img/Profile/avatar.png";
import {NavLink} from "react-router-dom";
import {UserT} from "../../Redux/usersReducer";

import {UserItemStyled} from "../../styles/theme";
import {Avatar} from "../assets/avatar/avatar";


type PropsType = {
    index: number,
    user: UserT,
    black: boolean,
    followProcces: Array<number>,
    unfollowThunkCreator: (userID: number) => void,
    followThunkCreator: (userID: number) => void,
}

let User: React.FC<PropsType> = props => {

    return (<UserItemStyled className={UsersStlyes.item} key={props.index.toString()}>
        <div className={UsersStlyes.header}>
            <Avatar size={100} link={(props.user.photos.small !== null) ? props.user.photos.small : AvatarImg}/>
            {/*<div className={UsersStlyes.avatar}>*/}
            {/*    <img*/}
            {/*        src={(props.user.photos.small !== null) ? props.user.photos.small : AvatarImg}*/}
            {/*        alt="avatar"/>*/}
            {/*</div>*/}
        </div>

        <div className={UsersStlyes.content}>
            <div className={UsersStlyes.name}>
                <NavLink to={"/profile/" + props.user.id}><h2>{props.user.name}</h2></NavLink>
            </div>

            <div className={UsersStlyes.status}>{props.user.status}</div>
        </div>

        <div className={UsersStlyes.buttons}>
            {props.user.followed ?
                <button disabled={props.followProcces.some(item => item === props.user.id)}
                        className={"unfollow"}
                        onClick={() => {
                            props.unfollowThunkCreator(props.user.id)
                        }}>Unfollow</button> :
                <button disabled={props.followProcces.some(item => item === props.user.id)}
                        onClick={() => {
                        props.followThunkCreator(props.user.id)
                }}>follow</button>
            }
        </div>

    </UserItemStyled>)
}


export default User;