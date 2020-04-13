import React from "react";
import {connect} from "react-redux";
import MessagesStyle from "./Messages.module.css";

let getCorrectTime = (date) => {
    let x = new Date();
    let timeZone = x.getTimezoneOffset() / 60;

    return (Number(date.slice(11, 13)) - timeZone) + date.slice(13, 16);
}


const Message = (props) => {

    return (
        <div className={MessagesStyle.messageItem + " " + (props.myId === props.senderId ? MessagesStyle.isMy : "")} >
            <div className={MessagesStyle.messageItemLogo}></div>
            <span className={MessagesStyle.data}>{getCorrectTime(props.addedAt)}</span>
            {props.mail}
        </div>
    );
};


class Messages extends React.Component{
    render() {

        let messages = this.props.messagesData.items.map(messageItem => <Message mail={messageItem.body}
                                                                                 key={messageItem.id}
                                                                                 addedAt={messageItem.addedAt}
                                                                                 senderId={messageItem.senderId}
                                                                                 myId={this.props.myId}/>).reverse()

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


