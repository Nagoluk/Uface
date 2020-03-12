import React from 'react';
import { connect } from 'react-redux';
import Header from "./header";
import {loginThunkCreator, logout} from "../../Redux/loginReducer";




class HeaderContainer extends React.Component {
    render(){   
        return (
            <Header {...this.props}/>
        );
    }
}



let mapStateToProps = (state) => {
    return {
        isLogined: state.LoginReducer.isLogined,
        email: state.LoginReducer.email,
        login: state.LoginReducer.login

    }
}

let Dispatch = {
    loginThunkCreator,
    logout
}

export default connect(mapStateToProps, Dispatch)(HeaderContainer);