import React, {Component} from 'react';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

class MessageList extends Component {
    render(){
        console.log("Rendering <MessageList/>")
        return (
            <div>
            <main className="messages">
            { this.props.messages.map((message) => {
                return (<Message message={message.content} username={message.username} key={message.uuid}/>)
            })}
                <Message />
            </main>
            </div>
        )
    }

}

MessageList.propTypes = {
    messages: PropTypes.array,
    uuid: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string
}

export default MessageList;