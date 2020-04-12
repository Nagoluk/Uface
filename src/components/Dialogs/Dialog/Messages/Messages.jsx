import DialogMod from "../DialogWithUser.module.css";
import React from "react";
import {connect} from "react-redux";


const Message = (props) => {
    let now = new Date().toString().slice(16, 21);

    return (
        <div className={DialogMod.messageItem + " " + (props.myId === props.senderId ? DialogMod.isMy : "")} >
            <div className={DialogMod.messageItemLogo}></div>
            <span className={DialogMod.data}>{now}</span>
            {props.mail}
        </div>
    );
};


class Messages extends React.Component{
    render() {

        let messages = this.props.messagesData.items.map(messageItem => <Message mail={messageItem.body}
                                                                                 key={messageItem.id}
                                                                                 myId={this.props.myId}
                                                                                 senderId={messageItem.senderId}/>).reverse()

        return  (<div className={DialogMod.messages}>
                    {messages}
                </div>)

    }
}


let mapStateToProps = (state) => {
    return {
        messagesData: state.MessagePage.messages,
    }
}

export default connect(mapStateToProps)(Messages)


