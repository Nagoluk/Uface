import React from 'react';
import UsersStlyes from './Users.module.css';
import User from "./User";
import { UserT } from '../../Redux/usersReducer';

type PropsType = {
    totalUsersCount: number,
    currentPage: number,
    pageSize: number,
    pagePagitator: number,
    setCurrentPagePagitator: (page: number) => void,
    users: Array<UserT>,
    followProcces: Array<number>,
    windowsWidth: number,

    onPageChange: (a: number)=>void,
    followThunkCreator: (a: number) => void,
    unfollowThunkCreator: (a: number) => void,
    toggleFollowProcessing: (a: number, b: boolean) => void
}

let Users: React.FC<PropsType> = ({totalUsersCount, pageSize, pagePagitator, setCurrentPagePagitator, users, ...props}) => {
    let pageCount = Math.ceil(totalUsersCount / pageSize);
    let pages: Array<number> = [];
    let portion;

    if(props.windowsWidth <= 635){
        portion = 6;
    }else {
        portion = 10;
    }

    let count = pagePagitator;
    let left = count * portion + 1;
    let right = left + portion - 1;


    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    let leftShift = () => {
        setCurrentPagePagitator(--count)
    }

    let rightShift = () => {
        setCurrentPagePagitator(++count)
    }

    pages = pages.filter(item => item >= left && item <= right)

    return (<div>
                <div className={UsersStlyes.settingPanel}>
                    <button className={UsersStlyes.navs} disabled={left <= 1} onClick={leftShift}>
                        <i className="fas fa-chevron-left"></i>
                    </button>

                    {pages.map((p, index) => {
                        return <button onClick={() => {
                            props.onPageChange(p)
                        }} className={(props.currentPage === p && UsersStlyes.active).toString()}
                                       key={index.toString()}>{p}</button>
                    })}

                    <button className={UsersStlyes.navs} onClick={rightShift} disabled={right >= pageCount}>
                        <i className="fas fa-chevron-right"></i>
                    </button>
                </div>

                <div className={UsersStlyes.itemWrap}>
                    {users.map((user, index) => <User user={user} key={index}index={index} {...props}/>)}
                </div>
             </div>)
}


export default Users;