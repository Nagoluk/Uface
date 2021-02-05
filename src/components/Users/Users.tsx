import React, {useEffect, useState} from 'react';
import UsersStlyes from './Users.module.css';
import User from './User';
import {Pagitator} from '../common/pagitator/Pagitator';
import {UniversalWrap} from '../../styles/wrap.styles'
import {UserT} from '../../interfaces/users-interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {
    getPagePagitator,
    getTotalUsersCountSelector,
    getPageSizeSelector,
    getUsersSelector, getCurrentPageSelector, getFollowProccesSelector, getIsFetchingSelector
} from '../../redux-state/selectors/users-selectors';
import {setUsersThunkCreator, unfollowThunkCreator, UsersActions, followThunkCreator} from '../../redux-state/usersReducer';
import Preloader from '../assets/preloader/Preloader';



let Users: React.FC = () => {
    const totalUsersCount = useSelector(getTotalUsersCountSelector)
    const pageSize = useSelector(getPageSizeSelector)
    const pagePagitator = useSelector(getPagePagitator)
    const users = useSelector(getUsersSelector)
    const currentPage = useSelector(getCurrentPageSelector)
    const followProcess = useSelector(getFollowProccesSelector)
    const isFetching = useSelector(getIsFetchingSelector)

    const [screenWidth, setScreenWidth] = useState(window.innerWidth)


    const dispatch = useDispatch()

    const screenWidthHandler = () => {
        if(window.innerWidth <= 635 && screenWidth >= 635){
            setScreenWidth(window.innerWidth)
        }

        if(window.innerWidth > 635 && screenWidth < 635){
            setScreenWidth(window.innerWidth)
        }
    }

    const onPageChange = (p: number) => {
        dispatch(setUsersThunkCreator(p, pageSize, {friends: false, term:''}));
    }

    const setCurrentPagePagitator = (p: number) => {
        dispatch(UsersActions.setCurrentPagePagitator(p))
    }

    const unfollow = (id: number) => {
        dispatch(unfollowThunkCreator(id))
    }

    const follow = (id: number) => {
        dispatch(followThunkCreator(id))
    }

    useEffect(()=>{
        document.title = "Users"

        window.addEventListener(`resize`, screenWidthHandler, false);

        dispatch(setUsersThunkCreator(currentPage, pageSize, {friends: false, term:''}));

        return () => {
            window.removeEventListener(`resize`, screenWidthHandler, false)
        }

    }, [])


    if(isFetching){
        return <Preloader/>
    }

    return (<UniversalWrap>
                <Pagitator currentPage={currentPage}
                           onPageChange={onPageChange}
                           pagePagitator={pagePagitator}
                           pageSize={pageSize}
                           setCurrentPagePagitator={setCurrentPagePagitator}
                           totalUsersCount={totalUsersCount}
                           windowsWidth={screenWidth}
                />


                <div className={UsersStlyes.itemWrap}>
                    {users.map((user, index) => <User user={user}
                                                                    followProcess={followProcess}
                                                                    key={index}
                                                                    index={index}
                                                                    followThunkCreator={follow}
                                                                    unfollowThunkCreator={unfollow}/>)}
                </div>
           </UniversalWrap>)
}


export default Users;