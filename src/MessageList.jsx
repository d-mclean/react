import React, {Component} from 'react';

class MessageList extends Component {
    render(){
        console.log("Rendering <MessageList/>")
        return (
            <div>
            <main className="messages" />
            </div>
        )
    }

}

export default MessageList;