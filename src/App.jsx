import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import PropTypes from 'prop-types';

const uuidv4 = require('uuid/v4');

class App extends Component {
  constructor(props){
    super(props);

    this.state = { database: {
        currentUser: {name: ""}, // optional. if currentUser is not defined, it means the user is Anonymous
        messages: [
        //   {
		// 	uuid: uuidv4(),
        //     username: "Bob",
        //     content: "Has anyone seen my marbles?",
        //   },
        //   {
		// 	uuid: uuidv4(),
        //     username: "Anonymous",
        //     content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        // 	}
			]
      	}, currentUser: "",
		userSocket: ""};
	}

	// in App.jsx
	componentDidMount() {
		console.log("componentDidMount <App />");

		// Create a new WebSocket and save it in the App state.
		let newSocket = new WebSocket("ws://localhost:3001");
		newSocket.onopen = function (event) {
			console.log("Connected to server.");
			//sendText(newSocket);
  		};
		
		this.setState({userSocket: newSocket});

		// On receiving a message, at to state so the interface refreshes.
		newSocket.onmessage = (event) => {
			let objMessage = JSON.parse(event.data);

			switch(objMessage.type){
				case "incomingMessage":

				break;
				case "incomingNotification":

				break;

				default:

				throw new Error("unknown even type" + objMessage.type);

			}
			this.state.database.messages.push(objMessage);
			this.setState({database: this.state.database});
		  };
	}

  render() {
	console.log("Rendering <App/>");
	let data = this.state.database.messages;
    return (
      <div>
      <MessageList messages={data}/>
      <ChatBar currentUser={this.state.currentUser} onChange={this.onChange.bind(this)} onKeyUp={this.onKeyUp.bind(this)}/>
      </div>
    );
  }

  onChange(field, value){
	//   const newMessage = {uuid: uuidv4(), username: this.state.currentUser.name, [field]: value};
	//   const messages = this.state.messages.concat(newMessage);
	//   this.setState({messages: messages});

	this.setState({currentUser: value})
  }

  onKeyUp(field, value){
	  //this.setState({currentUser: value})
	  const newMessage = {type: "incomingMessage", uuid: uuidv4(), username: this.state.currentUser, [field]: value};
	  //console.log(newMessage);
	  
	  // ADD NEW MESSAGE TO STATE??
	 //const messages = this.state.database.messages.concat(newMessage);
	//const messages = this.state.database.messages.push(newMessage)
	  //this.setState({database: {messages: messages}});

	  sendText(this.state.userSocket, newMessage);
  }

  onKeyUp2(field, value){
	  //this.setState({database: {field: value}});
	  console.log(this.state.database.currentUser.name)
  }
}

App.propTypes = {
    currentUser: PropTypes.string,
	value: PropTypes.string,
	messages: PropTypes.object
}

// Send text to all users through the server
function sendText(ns, nm) {
	// Construct a msg object containing the data the server needs to process the message from the chat client.
	// var msg = {
	//   type: "message",
	//   text: "ABCD",
	//   id:   "1",
	//   date: Date.now()
	// };
  
	// Send the msg object as a JSON-formatted string.
	//ns.send(JSON.stringify(msg));
	ns.send(JSON.stringify(nm));
	
	// Blank the text input element, ready to receive the next line of text from the user.
	//document.getElementById("text").value = "";
  }

export default App;
