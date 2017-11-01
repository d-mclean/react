import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
        currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
          {
			uuid: uuidv4(),
            username: "Bob",
            content: "Has anyone seen my marbles?",
          },
          {
			uuid: uuidv4(),
            username: "Anonymous",
            content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        	}
        	]
      	};
	}

	// in App.jsx
	componentDidMount() {
		console.log("componentDidMount <App />");
		setTimeout(() => {
		console.log("Simulating incoming message");
		// Add a new message to the list of messages in the data store
		const newMessage = {uuid: uuidv4(), username: "Michelle", content: "Hello there!"};
		const messages = this.state.messages.concat(newMessage)
		// Update the state of the app component.
		// Calling setState will trigger a call to render() in App and all child components.
		this.setState({messages: messages})
		}, 3000);
	}

  render() {
    console.log("Rendering <App/>")
    return (
      <div>
      <MessageList messages={this.state.messages}/>
      <ChatBar currentUser={this.state.currentUser.name} onChange={this.onChange.bind(this)} onKeyup={this.onKeyup.bind(this)}/>
      </div>
    );
  }

  onChange(field, value){
	  const newMessage = {uuid: uuidv4(), username: this.state.currentUser.name, [field]: value};
	  const messages = this.state.messages.concat(newMessage);
	  this.setState({messages: messages});
  }

  onKeyup(field, value){
	  this.setState({currentUser: value})
  }
}

App.propTypes = {
    currentUser: PropTypes.string,
    value: PropTypes.string
}

export default App;
