import React from "react";
import Styles from "./FormControls.module.css";



export const Input = ({input, meta, ...props}) => {

    return (
        <div>
            <input {...props} {...input}/>
        </div>)
}