import React, {useState} from 'react';
import Set from './../setting.module.css';
import styles from "../../Login/Login.module.css";
import {Field, reduxForm} from "redux-form";
import {Input} from "../../common/formControls/FormControls";


let FieldRender = props => {
    return (<div className={styles.Input}>
        <label>{props.name}</label>
        <Field type={"text"} placeholder={props.name} component={Input} name={props.name}/>
    </div>)
}


let ContactsForm = props => {

    return (<form onSubmit={props.handleSubmit} className={Set.Form}>

                <FieldRender name={"facebook"}/>
                <FieldRender name={"website"}/>
                <FieldRender name={"vk"}/>
                <FieldRender name={"twitter"}/>
                <FieldRender name={"instagram"}/>
                <FieldRender name={"youtube"}/>
                <FieldRender name={"github"}/>
                <FieldRender name={"mainLink"}/>


        <button className={Set.Send}>Send</button>
    </form>)
}

ContactsForm = reduxForm({form: "updateContacts"})(ContactsForm)

const UpdateContacts = props =>  {
    let saveChanges = info => {
        let data = {
            ...props.profile,
            contacts: {...props.profile.contacts, ...info}
        }

        console.log(data)

        props.putUserData(data)
    }
    return (<>
                <h2>Contacts</h2>
                <ContactsForm onSubmit={saveChanges}/>
            </>)
}

export default UpdateContacts;