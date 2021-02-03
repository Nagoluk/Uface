import React from 'react';
import {Formik} from 'formik';
import {Form, ResetButton, SubmitButton} from 'formik-antd';
import {UniversalThemeComponent} from '../../../styles/theme';
import Styles from '../setting.module.css';
import {renderField} from './update-profile-form';
import {ProfileType} from '../../../interfaces/profile-interfaces';
import * as Yup from 'yup';
import {IKeys, ResultsCodes} from '../../../interfaces/common-interfaces';
import {ProfileAPI} from '../../../api/profile-api';
import {message} from 'antd';


type PropsType = {
    profile: ProfileType
}

export const UpdateContactForm: React.FC<PropsType> = ({profile}) => {
    const {contacts} = profile

    const validationScheme: IKeys = {}
    for (let key in contacts) {
        validationScheme[key] = Yup.string().url('Must be url').nullable()
    }

    const DisplayingErrorMessagesSchema = Yup.object().shape(validationScheme)

    return (<Formik
            initialValues={contacts}
            enableReinitialize
            validationSchema={DisplayingErrorMessagesSchema}
            onSubmit={(values, {setSubmitting}) => {
                setSubmitting(true)
                ProfileAPI.putProfileData({...profile, contacts: {...values}})
                    .then(res => {
                        if (res.data.resultCode === ResultsCodes.Success) {
                            message.success('Success', 1)
                        } else {
                            message.error(res.data.messages.join(' '))
                        }
                    }).catch(e => message.error(e)).finally(() => setSubmitting(false))
            }}
        >
            {({isSubmitting}) => (
                <Form layout={'vertical'}
                >
                    <UniversalThemeComponent className={Styles.item}>
                        <h2>Contacts</h2>

                        {Object.keys(contacts).map(renderField)}
                        <div className={Styles.buttons}>
                            <ResetButton>Reset all</ResetButton>
                            <SubmitButton disabled={isSubmitting}>Submit</SubmitButton>
                        </div>

                    </UniversalThemeComponent>

                </Form>
            )}
        </Formik>
    )
}