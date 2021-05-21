import React from 'react';
import {useSelector} from 'react-redux';
import {getIsLoginedSelector} from '../redux-state/selectors/login-selectors';
import { Redirect } from 'react-router-dom';

export const useRedirect = () => {
    const isLogined = useSelector(getIsLoginedSelector)

    if (isLogined) return <Redirect to={'/login'}/>

    return null
}