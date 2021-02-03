import React from 'react';
import {Formik} from 'formik';
import {Form, ResetButton, SubmitButton} from 'formik-antd';
import {UniversalThemeComponent} from '../../../styles/theme';
import Styles from '../setting.module.css';
import {renderField} from './update-profile-form';
import {ProfileType} from '../../../interfaces/profile-interfaces';
import {useDispatch, useSelector} from 'react-redux';
import {actionsProfile, putUserDataThunkCreator} from '../../../redux-state/profileReducer';
import * as Yup from 'yup';
import {IKeys} from '../../../interfaces/common-interfaces';



type PropsType = {
    profile: ProfileType
}

export const UpdateContactForm: React.FC<PropsType> = ({profile}) => {
    const {contacts} = profile
    const dispatch = useDispatch()

    const validationScheme: IKeys = {}
    for(let key in contacts){
          validationScheme[key] = Yup.string().url('Must be url').nullable()
    }

    const DisplayingErrorMessagesSchema = Yup.object().shape(validationScheme)


    return (<Formik
            initialValues={contacts}
            enableReinitialize
            validationSchema={DisplayingErrorMessagesSchema}
            validate={(values) => {

            }}
            onSubmit={(values, { setSubmitting, ...props }) => {
                setSubmitting(true)
                dispatch(putUserDataThunkCreator({...profile, contacts: {...values}}))
                setSubmitting(false)
            }}
        >
            {({ isSubmitting }) => (
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