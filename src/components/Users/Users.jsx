import React from 'react';
import UsersStlyes from './Users.module.css';
import {NavLink} from "react-router-dom";
import Avatar from  "../../img/Profile/avatar.png";



let Users = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div>
        <div className={UsersStlyes.settingPanel}>
            {pages.map((p, index) => {
                return <button onClick={() => {
                    props.onPageChange(p)
                }} className={(props.currentPage === p && UsersStlyes.active).toString() } key={index.toString()}>{p}</button>
            })}
          
        </div>
        <div className={UsersStlyes.itemWrap}>
            {props.users.map((u, index) => {
                return <div className={UsersStlyes.item} key={index.toString()}>
                    <div className={UsersStlyes.header}>
                        <div className={UsersStlyes.avatar}>
                            <img
                                src={(u.photos.small !== null) ? u.photos.small : Avatar}
                                alt="avatar"/>
                        </div>

                    </div>

                    <div className={UsersStlyes.content}>

                        <div className={UsersStlyes.name}>
                            <NavLink to={"/profile/" + u.id}><h2>{u.name}</h2></NavLink>
                        </div>
                        <div className={UsersStlyes.status}>{u.status}</div>
                        <div className={UsersStlyes.location}>
                            <span className={UsersStlyes.country}> Minsk </span>
                            <span className={UsersStlyes.city}>Belarus </span>
                        </div>


                    </div>

                    <div className={UsersStlyes.buttons}>
                        {u.followed ?
                            <button disabled = {props.followProcces.some(item => item === u.id)} className={UsersStlyes.follower} onClick={() => {
                                props.unfollowThunkCreator(u.id)
                            }}>Unfollow</button> :
                            <button disabled = {props.followProcces.some(item => item === u.id)} onClick={() => {
                                props.followThunkCreator(u.id)

                            }}>follow</button>
                        }
                    </div>

                </div>
            })
            }
        </div>
    </div>

}


export default Users;