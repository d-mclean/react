import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ChatBar extends Component {
    render(){
        console.log("Rendering <ChatBar/>")
        return (
            <footer className="chatbar">
                <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.currentUser}/>
                <input className="chatbar-message" name="content" placeholder="Type a message and hit ENTER" onChange={this.onFieldChange.bind(this)} onKeyUp={this.onKeyUp.bind(this)}/>
            </footer>
        )
    }

    onFieldChange(event){
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        this.props.onChange(fieldName, fieldValue);
    }

    onKeyUp(event){
        if (event.keyCode === 13){
            console.log("entereded");
        }
    }

}

ChatBar.propTypes = {
    currentUser: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default ChatBar;