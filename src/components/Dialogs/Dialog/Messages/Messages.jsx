import React from "react";
import {connect} from "react-redux";
import MessagesStyle from "./Messages.module.css";


const Message = (props) => {
    let now = new Date().toString().slice(16, 21);

    return (
        <div className={MessagesStyle.messageItem + " " + (props.myId === props.senderId ? MessagesStyle.isMy : "")} >
            <div className={MessagesStyle.messageItemLogo}></div>
            <span className={MessagesStyle.data}>{now}</span>
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

        return  (<div className={MessagesStyle.messages}>
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


