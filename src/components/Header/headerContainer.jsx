import React from 'react';
import { connect } from 'react-redux';
import Header from "./header";
import {loginThunkCreator} from "../../Redux/loginReducer";




class HeaderContainer extends React.Component {

    componentDidMount(){
        this.props.loginThunkCreator()
    }


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
    loginThunkCreator
}

export default connect(mapStateToProps, Dispatch)(HeaderContainer);