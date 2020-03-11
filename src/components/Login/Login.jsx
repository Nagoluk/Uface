import React from "react";
import styles from "./Login.module.css";
import {reduxForm, Field} from "redux-form";
import {Input} from "../common/formControls/FormControls";
import { required } from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "./../../Redux/loginReducer";


let Form = (props) => {

    return (<form className={styles.Form} onSubmit={props.handleSubmit}>
                <div>
                    <Field type={"text"} placeholder={"enter login"} component={Input} validate={required} name={"login"}/>
                </div>

                <div>
                    <Field type={"password"} placeholder={"enter password"} component={Input} validate={required} name={"password"}/>
                </div>

                <div>
                    <Field type={"checkbox"} component={"input"} name={"rememberMe"}/> Remember me
                </div>

                <div>
                    <button>Login in</button>
                </div>

            </form>)
}

let ReduxLoginForm = reduxForm({form: "login"})(Form)

let Login = props => {
    let onSubmit = (loginData) => {
        props.login(loginData.login, loginData.password, loginData.rememberMe)
      
    }
    return(<div className={styles.Login}>
                <h1>Login</h1>
                <ReduxLoginForm onSubmit={onSubmit}/>
           </div>)
}

export default connect(null, {login})(Login);