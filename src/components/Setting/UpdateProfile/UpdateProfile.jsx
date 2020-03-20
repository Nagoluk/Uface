import React from 'react';
import Set from './../setting.module.css';
import styles from "../../Login/Login.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/formControls/FormControls";
import {required} from "../../../utils/validators/validators";


let FormUpdateProfile = props => {
    return (<form onSubmit={props.handleSubmit} className={Set.Form}>

                <div className={styles.Input}>
                    <label>About you</label>
                    <Field type={"text"} placeholder={"enter about you"} component={Input} validate={required} name={"about"}/>
                </div>



                <div className={styles.Input}>
                    <div><Field type={"checkbox"} component={"input"} name={"lookingForAJob"}/>lookingForAJob</div>

                    <label>looking For A Job Description</label>
                    <Field type={"text"} placeholder={"lookingForAJobDescription"} component={Input} validate={required} name={"lookingForAJobDescription\""}/>
                </div>

        <button>Send</button>

            </form>)
}
let FormUpdate = reduxForm({form: "updateProfile"})(FormUpdateProfile)

const UpdateProfile = props =>  {
    let saveChanges = props => {

    }
    return (<>
                <h2><i className="fas fa-user-edit"></i>Update profile</h2>
                <FormUpdate onSubmit={saveChanges}/>
            </>)
}

export default UpdateProfile;