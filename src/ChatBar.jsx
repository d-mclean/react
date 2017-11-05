import React, {Component} from 'react';
import PropTypes from 'prop-types';

const uuidv4 = require('uuid/v4');

// Set a global variable for the default username for new users.
let gOldUserName = 'Anonymous';
const debugON = false;

class ChatBar extends Component {
    render(){
        consoleNotification("Rendering <ChatBar/>");
        return (
            <footer className="chatbar">
                <input className="chatbar-username" name="username" placeholder="Your Name (Optional)" onChange={this.onFieldChange.bind(this)} onKeyUp={this.onNameChange.bind(this)} />
                <input className="chatbar-message" name="content" placeholder="Type a message and hit ENTER" onKeyUp={this.onMessageSend.bind(this)}/>
            </footer>
        )
    }

    onFieldChange(event){
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    onMessageSend(event){
        if (event.keyCode === 13){
            const fieldName = event.target.name;
            const fieldValue = event.target.value;
            this.props.onKeyUp(fieldName, fieldValue);

            document.querySelector('.chatbar-message').value = '';
        }
    }

    // If the user hits enter, verify it's a new name then send a notification to the server.
    onNameChange(event){
        if (event.keyCode === 13){
            //const fieldName = event.target.name;
            const fieldValue = event.target.value;
            if (gOldUserName !== fieldValue) {
                this.setState({fieldName: fieldValue});
                const newMessage = {type: 'notification', uuid: uuidv4(), username: gOldUserName, newName: fieldValue, userList: []};
                
                sendText(this.props.userSocket, newMessage);

                // Update global name to track change.
                gOldUserName = fieldValue;
            }
        }
    }

}

ChatBar.propTypes = {
    currentUser: PropTypes.string,
    userSocket: PropTypes.instanceOf(WebSocket),
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyUp2: PropTypes.func
}

// Send text to all users through the server
function sendText(ns, nm) {
	// Send the msg object as a JSON-formatted string.
	ns.send(JSON.stringify(nm));
  }

// This function displays the console notifications if debugging is turned on.
function consoleNotification(strMsg){
	if (debugON){
		console.log(strMsg);
	}
}

export default ChatBar;