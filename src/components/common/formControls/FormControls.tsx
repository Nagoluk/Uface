import React from 'react';
import styles from './FormControls.module.css';
import {WrappedFieldProps} from 'redux-form';


type InputFieldType = (params: WrappedFieldProps) => React.ReactNode
export const InputField: InputFieldType = ({input, meta, ...props}): any => {
    let hasError = meta.error && meta.touched;

    return (<div className={styles.InputContainer}>
        <div>
            <input {...props} {...input}/>
        </div>
        {hasError && <span>{meta.error}</span>}
    </div>)
}
