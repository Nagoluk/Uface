import React from "react";
import styles from "./Login.module.css";
import {reduxForm, Field} from "redux-form";

let Form = (props) => {


    return (<form className={styles.Form} onSubmit={props.handleSubmit}>
                <div>
                    <Field type={"text"} placeholder={"enter login"} component={"input"} name={"login"}/>
                </div>

                <div>
                    <Field type={"password"} placeholder={"enter password"} component={"input"} name={"password"}/>
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

let Login = () => {
    let onSubmit = (form) => {
        console.log(form)
    }
    return(<div className={styles.Login}>
                <h1>Login</h1>
                <ReduxLoginForm onSubmit={onSubmit}/>
           </div>)
}

export default Login;