import React from 'react';
import Set from './../setting.module.css';
import styles from "../../Login/Login.module.css";
import {Field, reduxForm} from "redux-form";
import {InputField} from "../../common/formControls/FormControls";




let ContactsForm = (props) => {
  

    return (<form onSubmit={props.handleSubmit} className={Set.Form}>
             


        <button className={Set.Send}>Send</button>
    </form>)
}

let ContactsReduxForm = reduxForm({form: "updateContacts"})(ContactsForm)

const UpdateContacts = props =>  {
    
    let saveChanges = info => {
        let data = {
            ...props.profile,
            contacts: {...props.profile.contacts, ...info}
        }

        props.putUserData(data)
    }
    return (<>
                <h2>Contacts</h2>
                <ContactsReduxForm onSubmit={saveChanges} initalValues={props.profile.contacts}/>
            </>)
}

export default UpdateContacts;