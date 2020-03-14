import React from "react";
import styles from "./FormControls.module.css";



export const Input = ({input, meta, ...props}) => {
    let hasError = meta.error  && meta.touched;

    return (
        <div className={styles.InputContainer}>
            <div>
                <input {...props} {...input} />
            </div>
            {hasError && <span><i className="fas fa-exclamation"></i></span>} 
                {hasError && <span>{meta.error}</span>}
            
            
        </div>)
}