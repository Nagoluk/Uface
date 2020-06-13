import React from "react";
import styles from "./Login.module.css";
import {reduxForm, Field} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import { required } from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../Redux/loginReducer";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const LoginStyled = styled.form`
    background: ${props => (props.black ? '#2B2B2B' : '#ffffff')};
    color: ${props => (props.black ? '#fff' : '')};
    border: 1px solid ${props => (props.black ? '#2B2B2B' : 'lightgray')};
    transition: all .2s ease-in;
`




let Form = (props) => {
    return (<LoginStyled className={styles.Form} onSubmit={props.handleSubmit} black={props.black}>
                <div>
                    <div>
                        <h1><i className="fas fa-dragon"></i>Uface</h1>
                        <h2>Please sing up</h2>
                    </div>

                </div>

                <div className={styles.Input}>
                    <label>Enter your email <span>*</span></label>
                    <Field type={"text"} placeholder={"enter login"} component={Input} validate={required} name={"email"}/>
                </div>

                <div className={styles.Input}>
                    <label>Enter your password<span>*</span></label>
                    <Field type={"password"} placeholder={"enter password"} component={Input} validate={required} name={"password"}/>
                </div>

                <div className={styles.RememberMe}>
                    <Field type={"checkbox"} component={"input"} name={"rememberMe"}/> Remember me
                </div>


                {props.captcha && <div className={styles.Captcha}> 
                                        <img src={props.captcha} alt="captcha"/>
                                        <Field type={"text"} 
                                            placeholder={"enter captcha"} 
                                            component={Input} 
                                            name={"captcha"}/>
                </div>}

                {props.error && <div className={styles.Error}>{props.error}</div>}

                <div>
                    <button type="submit" disabled={props.submitting}>Login in</button>
                </div>

            </LoginStyled>)
}

let ReduxLoginForm = reduxForm({form: "login"})(Form)


class Login extends React.Component{
    componentDidMount() {
        document.title = "Login";
    }

    render() {
        let onSubmit = (loginData) => {
            this.props.login(loginData.email, loginData.password, loginData.rememberMe, loginData.captcha)

        }

        if(this.props.isLogined) {
            return <Redirect to="/profile"/>
        }

        return(<div className={styles.Login}>
            <ReduxLoginForm onSubmit={onSubmit} captcha={this.props.captcha} black={this.props.black}/>
        </div>)
    }
}


const mapStateToProps = (state) => ({
    isLogined: state.LoginReducer.isLogined,
    captcha: state.LoginReducer.captchaURL
})
export default connect(mapStateToProps, {login})(Login);