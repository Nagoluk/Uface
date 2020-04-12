import React from "react";
import {connect} from "react-redux";
import Dialogs from "./DialogsList";
import LoginHoc from "../../../hoc/loginHoc";
import {compose} from "redux";
import {getDialogsThunkCreator} from "../../../Redux/messageReducer";
import Preloader from "../../assets/preloader/Preloader";

class DialogsListContainer extends React.Component {
    componentDidMount() {
        this.props.getDialogsThunkCreator()
    }

    render (){
        if(this.props.messageData.dialogs === null) return <Preloader/>

        return <Dialogs {...this.props}/>
    }
}


let mapStateToProps = (state) =>{
    return {
        isLogined: state.LoginReducer.isLogined,
        messageData: state.MessagePage,
    }

}


export default compose(connect(mapStateToProps, {getDialogsThunkCreator}),
                LoginHoc)(DialogsListContainer);