import React from 'react';
import Set from './../setting.module.css';
import styles from "../../Login/Login.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/formControls/FormControls";
import {required} from "../../../utils/validators/validators";
import ButtonPreloader from "../../../img/Preloader/91.svg";





let FormUpdateProfile = props => {
    return (<form onSubmit={props.handleSubmit} className={Set.Form}>
                <div className={styles.Input}>
                    <label>Change name</label>
                    <Field type={"text"} placeholder={"change name"} component={Input} name={"fullName"} validate={required} />
                </div>

                <div className={styles.Input}>
                    <label>About you</label>
                    <Field type={"text"} placeholder={"enter about you"} component={"input"} name={"aboutMe"}/>
                </div>

                <div className={Set.LookingJob}>
                    <Field type={"checkbox"} component={"input"} name={"lookingForAJob"} />lookingForAJob
                </div>

                <div className={styles.Input}>
                    <label>looking For A Job Description</label>
                    <Field type={"text"} placeholder={"looking for a job description"} component={Input} name={"lookingForAJobDescription"} />
                </div>

                {props.error && <div className={styles.Error}>{props.error}</div>}


                <div className={Set.SubmitComtainer}>
                    {props.isUpload &&  <div className={Set.Processing}><img src={ButtonPreloader} alt=""/></div>}
                    {!props.isUpload && <button className={Set.Send}>Send</button>}                
                </div> 
            </form>)
}

let FormUpdate = reduxForm({form: "updateProfile"})(FormUpdateProfile)

const UpdateProfile = props =>  {

    let saveChanges = data => {
        let updatedData = {
            ...props.profile,
            ...data
        }

        props.putUserData(updatedData)
    }

    return (<>
                <h2>Update profile</h2>
                <FormUpdate profile={props.profile} onSubmit={saveChanges} initialValues={props.profile} isUpload={props.isUpload}/>
            </>)
}

export default UpdateProfile;