import React from 'react';
import UsersStlyes from './Users.module.css';
import User from "./User";
import { UserT } from '../../Redux/usersReducer';
import {Pagitator} from "../common/pagitator/Pagitator";

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

    return (<div>
                <Pagitator currentPage={props.currentPage}
                           onPageChange={props.onPageChange}
                           pagePagitator={pagePagitator}
                           pageSize={pageSize}
                           setCurrentPagePagitator={setCurrentPagePagitator}
                           totalUsersCount={totalUsersCount}
                           windowsWidth={props.windowsWidth}
                    />


                <div className={UsersStlyes.itemWrap}>
                    {users.map((user, index) => <User user={user} key={index}index={index} {...props}/>)}
                </div>
             </div>)
}


export default Users;