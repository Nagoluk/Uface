import React from 'react';
import UsersStlyes from './Users.module.css';
import {NavLink} from "react-router-dom";



let Users = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div>
        <div className={UsersStlyes.settingPanel}>
            {pages.map((p) => {
                return <button onClick={() => {
                    props.onPageChange(p)
                }} className={props.currentPage === p && UsersStlyes.active}>{p}</button>
            })}
          
        </div>
        <div className={UsersStlyes.itemWrap}>
            {props.users.map((u) => {
                return <div className={UsersStlyes.item}>
                    <div className={UsersStlyes.header}>
                        <div className={UsersStlyes.avatar}>
                            <img
                                src={(u.photos.small !== null) ? u.photos.small : "http://www.newdesignfile.com/postpic/2014/07/generic-profile-avatar_352864.jpg"}
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