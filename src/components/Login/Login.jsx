import React from "react";
import styles from "./Login.module.css";
import {reduxForm, Field} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import { required } from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "./../../Redux/loginReducer";
import { Redirect } from "react-router-dom";



let Form = (props) => {
    console.log(props)

    return (<form className={styles.Form} onSubmit={props.handleSubmit}>
                <div>
                    <Field type={"text"} placeholder={"enter login"} component={Input} validate={required} name={"email"}/>
                </div>

                <div>
                    <Field type={"password"} placeholder={"enter password"} component={Input} validate={required} name={"password"}/>
                </div>

                <div>
                    <Field type={"checkbox"} component={"input"} name={"rememberMe"}/> Remember me
                </div>

                {props.error && <div className={styles.Error}>{props.error}</div>}

                <div>
                    <button type="submit" disabled={props.submitting}>Login in</button>
                </div>

            </form>)
}

let ReduxLoginForm = reduxForm({form: "login"})(Form)

let Login = props => {

    let onSubmit = (loginData) => {
        props.login(loginData.email, loginData.password, loginData.rememberMe)
      
    }

    if(props.isLogined) {
        return <Redirect to="/profile"/>
    }
    
    return(<div className={styles.Login}>
                <h1>Login</h1>
                <ReduxLoginForm onSubmit={onSubmit}/>
           </div>)
}
const mapStateToProps = (state) => ({
    isLogined: state.LoginReducer.isLogined,
})
export default connect(mapStateToProps, {login})(Login);