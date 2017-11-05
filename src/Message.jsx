import React, {Component} from 'react';
import PropTypes from 'prop-types';

const debugON = false;

class Message extends Component {
    render(){
        consoleNotification("Rendering <Message/>")
        const mType = this.props.type;

        if (mType === 'notification'){
            return (
                <span className='message system'>
                {this.props.message}
                </span>);    
        } else {
            return (
                <div className='message'>
                    <span className='message-username'>
                    {this.props.username}
                    </span>
                    <span className='message-content'>
                    {this.props.message}
                    </span>
                </div>  
            );
        }
    }
}

Message.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    message: PropTypes.string,
    type: PropTypes.string
}

// This function displays the console notifications if debugging is turned on.
function consoleNotification(strMsg){
	if (debugON){
		console.log(strMsg);
	}
}

export default Message;