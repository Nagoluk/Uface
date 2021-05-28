import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {getIsLoginedSelector} from '../redux-state/selectors/login-selectors';
import { useHistory } from 'react-router-dom';

export const useRedirect = () => {
    const isLogined = useSelector(getIsLoginedSelector)
    const history = useHistory()


    if(!isLogined) {
        history.push('/login')
    }


    useEffect(() => {
        if(!isLogined) {
            history.push('/login')
        }
    }, [isLogined])
}