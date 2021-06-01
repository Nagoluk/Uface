import React from 'react'
import {UniversalThemeComponent} from '../../../styles/theme';
import {ErrorMessage, Formik} from 'formik';
import Styles from '../setting.module.css'
import {ProfileType} from '../../../interfaces/profile-interfaces';
import  {Checkbox, Form, Input, SubmitButton, ResetButton } from 'formik-antd'
import * as Yup from 'yup';
import {message} from 'antd';
import { ProfileAPI } from '../../../api/profile-api';
import {ResultsCodes} from '../../../interfaces/common-interfaces';
import {useTranslation} from 'react-i18next';

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

message.config({
    top: 75,
    duration: 4
})


export const renderField = (name: string) =>{
    return (<div className={Styles.formItem} key={name}>
                <Form.Item name={name} label={name} style={{'marginBottom': '9px'}}>
                    <Input type="text" name={name} placeholder={name}/>
                </Form.Item>
             </div>)
}


export const UpdateProfileForm: React.FC<PropsType> = ({profile}) => {
    const {aboutMe, fullName, lookingForAJobDescription, lookingForAJob} = profile
    const {t} = useTranslation()


    return (<Formik
                initialValues={{aboutMe, fullName, lookingForAJobDescription, lookingForAJob}}
                enableReinitialize
                validationSchema={DisplayingErrorMessagesSchema}
                onSubmit={(values, { setSubmitting}) => {
                    setSubmitting(true)
                    ProfileAPI.putProfileData({...profile, ...values})
                        .then(res => {
                            if(res.data.resultCode === ResultsCodes.Success) {
                                message.success('Success', 1)
                            }else {
                                message.error(res.data.messages.join(' '))
                            }
                    }).catch(e => message.error(e)).finally(() => setSubmitting(false))
                }}
            >
                {({ isSubmitting ,...props}) => (
                    <Form layout={'vertical'}
                    >

                        <UniversalThemeComponent className={Styles.item}>
                            <h2>{t('settings.profile')}</h2>

                            {Object.keys({aboutMe, fullName, lookingForAJobDescription}).map(renderField)}

                            <div className={Styles.formItem}>
                                <Checkbox name={'lookingForAJob'}>Looking for a job</Checkbox>
                                <ErrorMessage name={'lookingForAJob'} component="div" />
                            </div>

                            <div className={Styles.buttons}>
                                <ResetButton size={'large'}>{t('settings.reset')}</ResetButton>
                                <SubmitButton size={'large'} disabled={isSubmitting}>{t('settings.send')}</SubmitButton>
                            </div>
                        </UniversalThemeComponent>
                    </Form>
                )}
            </Formik>
        )
}