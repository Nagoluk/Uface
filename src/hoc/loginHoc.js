import React from "react";
import { Redirect } from "react-router-dom";


let LoginHoc = (Component) => {

    class RedirectComponent extends React.Component {
        render(){

            
            if(!this.props.isLogined) return <Redirect to="/login"/>

            return <Component {...this.props}/>
        }
    }

    return RedirectComponent;
}

export default LoginHoc;