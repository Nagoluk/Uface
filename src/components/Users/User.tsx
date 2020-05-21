import React from "react";
import UsersStlyes from "./Users.module.css";
import Avatar from "../../img/Profile/avatar.png";
import {NavLink} from "react-router-dom";
import {UserT} from "../../Redux/usersReducer";

type PropsType = {
    index: number,
    user: UserT
    followProcces: Array<number>,
    unfollowThunkCreator: (userID: number) => void,
    followThunkCreator: (userID: number) => void,


}
let User: React.FC<PropsType> = props => {

    debugger;
    return (<div className={UsersStlyes.item} key={props.index.toString()}>
        <div className={UsersStlyes.header}>
            <div className={UsersStlyes.avatar}>
                <img
                    src={(props.user.photos.small !== null) ? props.user.photos.small : Avatar}
                    alt="avatar"/>
            </div>
        </div>

        <div className={UsersStlyes.content}>
            <div className={UsersStlyes.name}>
                <NavLink to={"/profile/" + props.user.id}><h2>{props.user.name}</h2></NavLink>
            </div>

            <div className={UsersStlyes.status}>{props.user.status}</div>

            <div className={UsersStlyes.location}>
                <span className={UsersStlyes.country}> Minsk </span>
                <span className={UsersStlyes.city}>Belarus </span>
            </div>
        </div>

        <div className={UsersStlyes.buttons}>
            {props.user.followed ?
                <button disabled={props.followProcces.some(item => item === props.user.id)}
                        className={UsersStlyes.follower}
                        onClick={() => {
                            props.unfollowThunkCreator(props.user.id)
                        }}>Unfollow</button> :
                <button disabled={props.followProcces.some(item => item === props.user.id)}
                        onClick={() => {
                        props.followThunkCreator(props.user.id)
                }}>follow</button>
            }
        </div>

    </div>)
}


export default User;