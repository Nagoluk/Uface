import React from 'react';
import UsersStlyes from './Users.module.css';
import User from "./User";


let Users = (props) => {

    let pageCount = Math.ceil(props.totalUsersCount / props.pageSize);
    let pages = [];
    let portion = 8;
    let count = props.pagePagitator;


    let left = count * portion + 1;
    let right = left + portion - 1;


    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    let leftShift = () => {

        props.setCurrentPagePagitator(--count)
    }

    let rightShift = () => {

        props.setCurrentPagePagitator(++count)
    }

    pages = pages.filter(item => item >= left && item <= right)

    return (<div>

                <div className={UsersStlyes.settingPanel}>
                    <button className={UsersStlyes.navs} disabled={left <= 1} onClick={leftShift}>Left</button>
                    {pages.map((p, index) => {
                        return <button onClick={() => {
                            props.onPageChange(p)
                        }} className={(props.currentPage === p && UsersStlyes.active).toString()}
                                       key={index.toString()}>{p}</button>
                    })}
                    <button className={UsersStlyes.navs} onClick={rightShift} disabled={right >= pageCount}>Right</button>
                </div>


                <div className={UsersStlyes.itemWrap}>
                    {props.users.map((user, index) => <User user={user} index={index} {...props}/>)}
                </div>
             </div>)

}


export default Users;