import {connect} from "react-redux";
import Dialogs from "./Dialogs";
import LoginHoc from "./../../hoc/loginHoc"



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

let isLogined = LoginHoc(Dialogs)


let DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(isLogined)

export default DialogsContainer;