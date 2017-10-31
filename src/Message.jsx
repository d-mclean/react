import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Message extends Component {
    static propTypes = {
        username: PropTypes.string,
        content: PropTypes.string
    };

    constructor(props){
        super(props);

        this.state = {};
        this.state.message = [
                {
                    username: 'Anonymous1',
                    content: 'I won\'t be impressed with technology until I can download food.'
                }
            ];
    }

    render(){
        console.log("Rendering <Message/>")
        //const messages = this.state.message;
        return (
            <div className="message">
                <span className="message-username">
                Anonymous1
                </span>
                <span className="message-content">
                I won't be impressed with technology until I can download food.
                </span>
            </div>  
        );
    }

}

export default Message;