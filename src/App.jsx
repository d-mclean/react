import React, {Component} from 'react';

import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Message from './Message.jsx';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip'

const uuidv4 = require('uuid/v4');
const debugON = false;

// Global variable that keeps a CSV-style string of the current users.
let csvUserList = '';

// Create a new WebSocket (and stash it in the App state).
let newSocket = new WebSocket('ws://localhost:3001');

class App extends Component {
	constructor(props){
		super(props);
	
		this.state = { database: {
				messages: []
			}, 
			currentUser: 'Anonymous',
			userList: [],
			userSocket: newSocket};
		}

	componentDidMount() {
		consoleNotification("componentDidMount <App />");

		newSocket.onopen = function (event) {
			consoleNotification("Connected to server.");
  		};
		
		this.setState({userSocket: newSocket});

		// On receiving a message, add to state so the interface refreshes.
		newSocket.onmessage = (event) => {
			let objMessage = JSON.parse(event.data);

			switch(objMessage.type){
				case 'message':
					this.state.database.messages.push(objMessage);
					this.setState({database: this.state.database});
					break;
				case 'notification':
					objMessage['content'] = `${objMessage['username']} has changed their name to ${objMessage['newName']}`;
					this.state.database.messages.push(objMessage);
					this.setState({database: this.state.database});
					this.setState({userList:objMessage['userList']})
					break;
				case 'update':
					updateCounter(objMessage.totalUsers, objMessage.userList);
					this.setState({userList: objMessage.userList});
					break;
				default:

				throw new Error('unknown message type ' + objMessage.type);

			}
		};
	}

	render() {
		consoleNotification("Rendering <App/>");
		let data = this.state.database.messages;

		let csv = '';
		for (let u in this.state.userList){
			csv += `${this.state.userList[u]}, `
		}

		return (
			<div>
			<ReactTooltip id='getContent'>
			{csv.slice(0, -2)}
			</ReactTooltip>
			<MessageList messages={data}/>
			<ChatBar userSocket={this.state.userSocket} currentUser={this.state.currentUser} onChange={this.onChange.bind(this)} onKeyUp={this.onKeyUp.bind(this)}/>
			</div>
		);
	}

	// Keep tabs of the current users name as they are changing it.
	onChange(field, value){
		this.setState({currentUser: value})
	}

	// On key up, we want to send a name change message to the server.
	onKeyUp(field, value){
		const newMessage = {type: 'message', uuid: uuidv4(), username: this.state.currentUser, [field]: value};
		sendText(this.state.userSocket, newMessage);
	}
}

App.propTypes = {
    currentUser: PropTypes.string,
	value: PropTypes.string,
	messages: PropTypes.object,
	userList: PropTypes.array
}

// Send text to all users through the server
function sendText(ns, nm) {
	// Send the msg object as a JSON-formatted string.
	ns.send(JSON.stringify(nm));
}

// This function updates the 'users online' counter.
function updateCounter(i, arr){
	const navbarCounter = document.querySelector('.navbar-counter')

	// Convert the array to a CSV-style string.
	let csv = '';
	for (let u in arr){
		csv += `${arr[u]}, `
	}

	// Remove the extra comma+space at the end.
	csvUserList = csv.slice(0, -2);

	// Update the string for the user list counter.
	let strMsg = i;

	if (i < 1) {
		strMsg += ' user online';
	} else {
		strMsg += ' users online';
	}

	// Remove then update the counter.
	navbarCounter.removeChild(navbarCounter.firstChild);
	navbarCounter.appendChild( document.createTextNode(strMsg));
}

// This function displays the console notifications if debugging is turned on.
function consoleNotification(strMsg){
	if (debugON){
		console.log(strMsg);
	}
}

export default App;
