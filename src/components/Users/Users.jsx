import React from 'react';
import UsersStlyes from './Users.module.css';
import User from "./User";


let Users = (props) => {
    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return (<div>
                <div className={UsersStlyes.settingPanel}>
                    {pages.map((p, index) => {
                        return <button onClick={() => {
                            props.onPageChange(p)
                        }} className={(props.currentPage === p && UsersStlyes.active).toString()}
                                       key={index.toString()}>{p}</button>
                    })}
                </div>

                <div className={UsersStlyes.itemWrap}>
                    {props.users.map((user, index) => <User user={user} index={index} {...props}/>)}
                </div>
             </div>)

}


export default Users;