import React from 'react';
import UsersStlyes from './Users.module.css';
import User from './User';
import {Pagitator} from '../common/pagitator/Pagitator';
import {UniversalWrap} from '../../styles/wrap.styles'
import {UserT} from "../../interfaces/users-interfaces";


type PropsType = {
    totalUsersCount: number,
    currentPage: number,
    pageSize: number,
    pagePagitator: number,
    setCurrentPagePagitator: (page: number) => void,
    users: Array<UserT>,
    followProcess: Array<number>,
    windowsWidth: number,
    black: boolean,

    onPageChange: (a: number)=>void,
    followThunkCreator: (a: number) => void,
    unfollowThunkCreator: (a: number) => void,
    toggleFollowProcessing: (a: number, b: boolean) => void
}

let Users: React.FC<PropsType> = ({totalUsersCount, pageSize, pagePagitator, setCurrentPagePagitator, users, ...props}) => {

    return (<UniversalWrap>
                <Pagitator currentPage={props.currentPage}
                           onPageChange={props.onPageChange}
                           pagePagitator={pagePagitator}
                           pageSize={pageSize}
                           setCurrentPagePagitator={setCurrentPagePagitator}
                           totalUsersCount={totalUsersCount}
                           windowsWidth={props.windowsWidth}
                    />


                <div className={UsersStlyes.itemWrap}>
                    {users.map((user, index) => <User user={user} key={index}index={index} {...props} black={props.black}/>)}
                </div>
             </UniversalWrap>)
}


export default Users;