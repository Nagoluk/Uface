import React from 'react';
import {reduxForm, Field, InjectedFormProps} from 'redux-form';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';

import styles from './Login.module.css';

import {InputField} from '../common/formControls/FormControls';
import { required } from '../../utils/validators/validators';
import {login} from '../../Redux/loginReducer';

import {AppStateType} from '../../Redux/stateRedux';
import {LoginWrapStyled} from '../../styles/theme';

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
                        <h1><i className="fas fa-dragon"></i>Uface</h1>
                        <h2>Please sing up</h2>
                    </div>
                </div>

                <div className={styles.Input}>
                    <label>Enter your email <span>*</span></label>
                    <Field type={"text"} placeholder={"enter login"} component={InputField} validate={required} name={"email"}/>
                </div>

                <div className={styles.Input}>
                    <label>Enter your password<span>*</span></label>
                    <Field type={"password"} placeholder={"enter password"} component={InputField} validate={required} name={"password"}/>
                </div>

                <div className={styles.RememberMe}>
                    <Field type={"checkbox"} component={"input"} name={"rememberMe"}/> Remember me
                </div>


                {captcha && <div className={styles.Captcha}>
                                        <img src={captcha} alt="captcha"/>
                                        <Field type={"text"} 
                                            placeholder={"enter captcha"} 
                                            component={InputField}
                                            name={"captcha"}/>
                </div>}

                {error && <div className={styles.Error}>{error}</div>}

                <div>
                    <button type="submit" disabled={submitting}>Login in</button>
                </div>

            </form>)
}

let ReduxLoginForm = reduxForm<loginFormValuesType, LoginFormOwnProps>({form: "login"})(Form)

type mapStatePropsType = {
    isLogined: boolean
    captcha: string | null
}

type mapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean , captcha: string | null) => void
}



type loginPropsType = mapDispatchToPropsType & mapStatePropsType


class Login extends React.Component<loginPropsType>{
    componentDidMount() {
        document.title = "Login";
    }

    render() {
        let onSubmit = (loginData: loginFormValuesType) => {
            this.props.login(loginData.email, loginData.password, loginData.rememberMe, loginData.captcha)
        }

        if(this.props.isLogined) {
            return <Redirect to="/profile"/>
        }

        return(<div className={styles.Login}>
                    <LoginWrapStyled>
                        <ReduxLoginForm onSubmit={onSubmit} captcha={this.props.captcha} />
                    </LoginWrapStyled>
               </div>)
    }
}


const mapStateToProps = (state: AppStateType): mapStatePropsType=> ({
    isLogined: state.LoginReducer.isLogined,
    captcha: state.LoginReducer.captchaURL
})
export default connect(mapStateToProps, {login})(Login);