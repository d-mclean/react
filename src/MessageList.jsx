import React, {Component} from 'react';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

const debugON = false;

class MessageList extends Component {
    render(){
        consoleNotification("Rendering <MessageList/>")
        return (
            <div>
            <main className="messages">
            { this.props.messages.map((message) => {
                return (<Message message={message.content} username={message.username} key={message.uuid} type={message.type} />)
            })}
            </main>
            </div>
        )
    }
}

MessageList.propTypes = {
    database: PropTypes.object,
    messages: PropTypes.array,
    uuid: PropTypes.string,
    username: PropTypes.string,
    content: PropTypes.string
}

// This function displays the console notifications if debugging is turned on.
function consoleNotification(strMsg){
	if (debugON){
		console.log(strMsg);
	}
}

export default MessageList;