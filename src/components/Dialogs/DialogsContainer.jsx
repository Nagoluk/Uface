import React from "react";
import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import LoginHoc from "./../../hoc/loginHoc";
import {compose} from "redux";

class DialogsContainer extends React.Component {

    render (){
        return <Dialogs {...this.props}/>
    }
}


let mapStateToProps = (state) =>{
    return {
        isLogined: state.LoginReducer.isLogined,
        messageData: state.MessagePage,
    }

}

let mapDispatchToProps = (dispatch) =>{
    return {
        dispatch: dispatch,
    }

}

export default compose(connect(mapStateToProps, mapDispatchToProps),
                LoginHoc)(DialogsContainer);