import React, {useEffect} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import {useDispatch, useSelector} from 'react-redux';
import {Redirect} from 'react-router-dom';

import styles from './Login.module.css';

import {InputField} from '../common/formControls/FormControls';
import {required} from '../../utils/validators/validators';
import {login} from '../../redux-state/loginReducer';
import {LoginWrapStyled} from '../../styles/theme';
import styled from 'styled-components';
import {getCaptchaSelector, getIsLoginedSelector} from '../../redux-state/selectors/login-selectors';
import {AliwangwangOutlined} from '@ant-design/icons';

const Background = styled.div`
    width: 75%;
    height: 100%;
    background: url('https://image.freepik.com/free-vector/season-rain-blue-seamless-background_95169-905.jpg');
`

type loginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string | null
}

type LoginFormOwnProps = {
    captcha: string | null
}

let Form: React.FC<InjectedFormProps<loginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({
                                                                                                         handleSubmit,
                                                                                                         submitting,
                                                                                                         error,
                                                                                                         captcha
                                                                                                     }) => {
    return (<form className={styles.Form} onSubmit={handleSubmit}>
        <div>
            <div>
                <h1><AliwangwangOutlined />Uface</h1>
                <h2>Please sing up</h2>
            </div>
        </div>

        <div className={styles.Input}>
            <label>Enter your email <span>*</span></label>
            <Field type={'text'} placeholder={'enter login'} component={InputField} validate={required} name={'email'}/>
        </div>

        <div className={styles.Input}>
            <label>Enter your password<span>*</span></label>
            <Field type={'password'} placeholder={'enter password'} component={InputField} validate={required}
                   name={'password'}/>
        </div>

        <div className={styles.RememberMe}>
            <Field type={'checkbox'} component={'input'} name={'rememberMe'}/> Remember me
        </div>


        {captcha && <div className={styles.Captcha}>
            <img src={captcha} alt="captcha"/>
            <Field type={'text'}
                   placeholder={'enter captcha'}
                   component={InputField}
                   name={'captcha'}/>
        </div>}

        {error && <div className={styles.Error}>{error}</div>}

        <div>
            <button type="submit" disabled={submitting}>Login in</button>
        </div>

    </form>)
}

let ReduxLoginForm = reduxForm<loginFormValuesType, LoginFormOwnProps>({form: 'login'})(Form)


export const Login = () => {
    useEffect(() => {
        document.title = 'Login';
    }, [])

    const isLogined = useSelector(getIsLoginedSelector)
    const captcha = useSelector(getCaptchaSelector)

    const dispatch = useDispatch()


    let onSubmit = (loginData: loginFormValuesType) => {
        dispatch(login(loginData.email, loginData.password, loginData.rememberMe, loginData.captcha))
    }

    if (isLogined) {
        return <Redirect to="/profile"/>
    }

    return (<div className={styles.Login}>
                <Background className={styles.Photo}/>

                <LoginWrapStyled className={styles.LoginForm}>
                    <ReduxLoginForm onSubmit={onSubmit} captcha={captcha}/>
                </LoginWrapStyled>
            </div>)
}

export default Login
