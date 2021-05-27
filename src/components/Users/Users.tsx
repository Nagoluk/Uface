import React, {useEffect, useState} from 'react';
import UsersStlyes from './Users.module.css';
import User from './User';
import {Pagitator} from '../common/pagitator/Pagitator';
import {UniversalWrap} from '../../styles/wrap.styles'

import {useDispatch, useSelector} from 'react-redux';
import {
    getPagePagitator,
    getTotalUsersCountSelector,
    getPageSizeSelector,
    getUsersSelector, getCurrentPageSelector, getFollowProccesSelector, getIsFetchingSelector, getUsersErrorSelector
} from '../../redux-state/selectors/users-selectors';
import {setUsersThunkCreator, unfollowThunkCreator, UsersActions, followThunkCreator} from '../../redux-state/usersReducer';
import Preloader from '../assets/preloader/Preloader';
import {useTranslation} from 'react-i18next';
import { Button } from 'antd';
import Search from 'antd/lib/input/Search';
import {IFilters} from '../../interfaces/common-interfaces';
import { NotFound } from '../common/notFount/NotFound';
import {UserOptionItemStyled} from '../../styles/theme';
import { useHistory } from 'react-router-dom';
import {useRedirect} from '../../hook/Redirect';
import {NetworkError} from '../common/NetworkError/NetworkError';

const qs = require('qs')


let Users: React.FC = () => {
    // useRedirect()

    const totalUsersCount = useSelector(getTotalUsersCountSelector)
    const pageSize = useSelector(getPageSizeSelector)
    const pagePagitator = useSelector(getPagePagitator)
    const users = useSelector(getUsersSelector)
    const currentPage = useSelector(getCurrentPageSelector)
    const followProcess = useSelector(getFollowProccesSelector)
    const isFetching = useSelector(getIsFetchingSelector)
    const error = useSelector(getUsersErrorSelector)
    const {t} = useTranslation()


    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [filters, setFilters] = useState<IFilters>({})
    const [searchStr, setSearchStr] = useState('')


    const dispatch = useDispatch()
    const history = useHistory()

    const screenWidthHandler = () => {
        if(window.innerWidth <= 635 && screenWidth >= 635){
            setScreenWidth(window.innerWidth)
        }

        if(window.innerWidth > 635 && screenWidth < 635){
            setScreenWidth(window.innerWidth)
        }
    }

    const onPageChange = (p: number) => {
        dispatch(setUsersThunkCreator(p, pageSize, filters));
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

    const getUsers = () => {
        let temp = qs.parse(history.location.search, { ignoreQueryPrefix: true })
        if(temp.term) setSearchStr(temp.term)
        setFilters(temp)


        dispatch(setUsersThunkCreator(currentPage, pageSize, temp));
    }

    const find = (value: string) => {
        if(value === ""){
            setFilters(prevState => {
                let temp = {...prevState}
                delete temp.term
                return temp
            })
        }else  {
            setFilters(prevState => ({...prevState, term: value}))
        }
    }

    useEffect(()=>{
        document.title = "Users"
        window.addEventListener(`resize`, screenWidthHandler, false);

        getUsers()

        return () => {
            window.removeEventListener(`resize`, screenWidthHandler, false)
        }

    }, [])

    useEffect(() => {
        const uri = qs.stringify(filters)
        history.push('/friends?'+uri)

        dispatch(setUsersThunkCreator(1, pageSize, filters));
    }, [filters])

    if(error) {
       return <NetworkError refresh={getUsers}/>
    }



    return (<UniversalWrap maxWidth={600}>
                <Pagitator currentPage={currentPage}
                           onPageChange={onPageChange}
                           pagePagitator={pagePagitator}
                           pageSize={pageSize}
                           setCurrentPagePagitator={setCurrentPagePagitator}
                           totalUsersCount={totalUsersCount}
                           windowsWidth={screenWidth}
                           filters={filters}
                />

                <UserOptionItemStyled className={UsersStlyes.option}>
                    <Button type={(filters.friend === undefined) ? 'primary': 'default'}
                            onClick={() => setFilters(prevState => {
                               let temp = {...prevState}
                               delete temp.friend
                               return temp
                            })}
                            size={"large"}>All
                    </Button>
                    <Button size={"large"}
                            onClick={() => setFilters(prevState => ({...prevState, friend: true}))}
                            type={(filters.friend) ? 'primary': 'default'}>Followers
                    </Button>
                    <Button size={"large"}
                            onClick={() => setFilters(prevState => ({...prevState, friend: false}))}
                            type={(filters.friend === false) ? 'primary': 'default'}>Not followed
                    </Button>
                    <Search placeholder="input search text"
                            allowClear
                            enterButton
                            value={searchStr}
                            onChange={e => setSearchStr(e.target.value)}
                            size={"large"} onSearch={find}
                    />
                </UserOptionItemStyled>


                {isFetching ? <Preloader/> : <div className={UsersStlyes.itemWrap}>
                    {users.map((user, index) => <User user={user}
                                                                    followProcess={followProcess}
                                                                    key={index}
                                                                    t={t}
                                                                    index={index}
                                                                    followThunkCreator={follow}
                                                                    unfollowThunkCreator={unfollow}/>)}
                </div>}

                {users.length === 0 && <NotFound/>}
           </UniversalWrap>)
}


export default Users;