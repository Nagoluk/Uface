import React from "react";
import styles from "./Login.module.css";
import {reduxForm, Field} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import { required } from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "./../../Redux/loginReducer";
import { Redirect } from "react-router-dom";



let Form = (props) => {

    return (<form className={styles.Form} onSubmit={props.handleSubmit}>
                <div>
                    <h1>Please sing up</h1>
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

            </form>)
}

let ReduxLoginForm = reduxForm({form: "login"})(Form)

let Login = props => {

    let onSubmit = (loginData) => {
        props.login(loginData.email, loginData.password, loginData.rememberMe, loginData.captcha)
      
    }

    if(props.isLogined) {
        return <Redirect to="/profile"/>
    }
    
    return(<div className={styles.Login}>
                <ReduxLoginForm onSubmit={onSubmit} captcha={props.captcha}/>
           </div>)
}
const mapStateToProps = (state) => ({
    isLogined: state.LoginReducer.isLogined,
    captcha: state.LoginReducer.captchaURL
})
export default connect(mapStateToProps, {login})(Login);