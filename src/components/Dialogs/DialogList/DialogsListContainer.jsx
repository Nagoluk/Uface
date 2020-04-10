import React from "react";
import {connect} from "react-redux";
import Dialogs from "./DialogsList";
import LoginHoc from "../../../hoc/loginHoc";
import {compose} from "redux";
import {getDialogsThunkCreator} from "../../../Redux/messageReducer";

class DialogsListContainer extends React.Component {
    componentDidMount() {
        this.props.setDialogsThunkCreator()
    }

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


export default compose(connect(mapStateToProps, {setDialogsThunkCreator: getDialogsThunkCreator}),
                LoginHoc)(DialogsListContainer);