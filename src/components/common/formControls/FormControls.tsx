import React from "react";
import styles from "./FormControls.module.css";
import {Input} from "antd";

type PropsType = {
    input: {}
    meta: {
        error: string
        touched: boolean
    }
}
type InputFieldType = (params: PropsType) => React.ReactNode
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
