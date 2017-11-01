import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
    render(){
        console.log("Rendering <Message/>")
        //const messages = this.state.message;
        return (
            <div className="message">
                <span className="message-username">
                {this.props.username}
                </span>
                <span className="message-content">
                {this.props.message}
                </span>
            </div>  
        );
    }

}

Message.propTypes = {
    id: PropTypes.number,
    username: PropTypes.string,
    message: PropTypes.string
}

export default Message;