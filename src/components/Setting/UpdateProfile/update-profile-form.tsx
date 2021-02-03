import React from 'react'
import {UniversalThemeComponent} from '../../../styles/theme';
import {ErrorMessage, Formik} from 'formik';
import Styles from '../setting.module.css'
import {ProfileType} from '../../../interfaces/profile-interfaces';
import { Form, Input, SubmitButton, ResetButton } from 'formik-antd'
import * as Yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {putUserDataThunkCreator} from '../../../redux-state/profileReducer';
import {AppStateType} from '../../../redux-state/stateRedux';
import {message} from 'antd';

type PropsType = {
    profile: ProfileType
}

const DisplayingErrorMessagesSchema = Yup.object().shape({
    aboutMe: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    fullName: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    lookingForAJobDescription: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!'),
});



export const renderField = (name: string) =>{
    return (<div className={Styles.formItem} key={name}>
                <Form.Item name={name} label={name} style={{'marginBottom': '15px'}}>
                    <Input type="text" name={name} placeholder={name}/>
                </Form.Item>
             </div>)
}


export const UpdateProfileForm: React.FC<PropsType> = ({profile}) => {
    const serverErrors = useSelector((state: AppStateType) => state.ProfilePage.setProfileErrors)

    if(serverErrors.length > 0) {
       for(let value of serverErrors) {
           message.error(value);
       }
    }

    const {aboutMe, fullName, lookingForAJobDescription, lookingForAJob} = profile

    const dispatch = useDispatch()

    return (<Formik
                initialValues={{aboutMe, fullName, lookingForAJobDescription, lookingForAJob}}
                enableReinitialize
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={async (values, { setSubmitting, ...props},) => {
                    try {
                        dispatch(putUserDataThunkCreator({...profile, ...values}))
                    }catch (e) {
                        debugger
                    }finally {

                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form layout={'vertical'}
                    >

                        <UniversalThemeComponent className={Styles.item}>
                            <h2>Profile</h2>

                            {Object.keys({aboutMe, fullName, lookingForAJobDescription}).map(renderField)}

                            <div className={Styles.formItem}>
                                <Form.Item name={"Looking for a job"} label={"Looking for a job"}>
                                    <Input type="checkbox" name={'lookingForAJob'}/>
                                    <ErrorMessage name={'lookingForAJob'} component="div" />
                                </Form.Item>
                            </div>


                            <div className={Styles.buttons}>
                                <ResetButton>Reset all</ResetButton>
                                <SubmitButton>Submit</SubmitButton>
                            </div>
                        </UniversalThemeComponent>

                    </Form>
                )}
            </Formik>
        )
}