import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChatBar extends Component {
    render(){
        console.log("Rendering <ChatBar/>")
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
        //console.log("yyy");
    }

    onMessageSend(event){
        if (event.keyCode === 13){
            const fieldName = event.target.name;
            const fieldValue = event.target.value;
            this.props.onKeyUp(fieldName, fieldValue);
        }
    }

    onNameChange(event){
        if (event.keyCode === 13){
            const fieldName = event.target.name;
            const fieldValue = event.target.value;
            //this.props.onChange(fieldName, fieldValue);
            //this.setState({database:{currentUser: {name: field}}})
            this.setState({fieldName: fieldValue});
        }
    }

}

ChatBar.propTypes = {
    currentUser: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    onKeyUp: PropTypes.func,
    onKeyUp2: PropTypes.func,
    userSocket: PropTypes.instanceOf(WebSocket)
}

export default ChatBar;