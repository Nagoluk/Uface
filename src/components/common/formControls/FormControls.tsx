import React from "react";
import styles from "./FormControls.module.css";
import {Input} from "antd";
import {WrappedFieldProps} from "redux-form";


type InputFieldType = (params: WrappedFieldProps) => React.ReactNode
export const InputField: InputFieldType = ({input, meta, ...props}): any => {
    let hasError = meta.error  && meta.touched;

    return (<div className={styles.InputContainer}>
                <div>
                    <Input {...props} {...input} size={"large"} />
                </div>
                {hasError && <span><i className="fas fa-exclamation"></i></span>}
                {hasError && <span>{meta.error}</span>}
            </div>)
}
