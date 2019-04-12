import React, { Component } from 'react';
import MessageInput from './stateless/MessageInput/MessageInput';
import ChatLog from './stateless/ChatLog/ChatLog';
import axios from 'axios';

class App extends Component {
  state = {
    author: '名無しさん',
    messages: []
  }

  chatStream = new EventSource('https://japaneseverticalchat.firebaseio.com/messages.json');

  componentDidMount(){
    // axios.get('https://japaneseverticalchat.firebaseio.com/messages.json')
    //   .then((res) => {        

      //Set up stream
      this.chatStream.addEventListener('put', (event) => {
        let data = JSON.parse(event.data); //Messages are in another object (data.data now)

        console.log(data)

        //Put messages into an array
        let incomingMessages = [...this.state.messages]; //immutable fashion

        if(data.path === '/'){
          for(let incMessage in data.data){
            incomingMessages.push({
              author: data.data[incMessage].author,
              message: data.data[incMessage].message,
              timestamp: data.data[incMessage].timestamp,
              key: incMessage
            });
          }
        } else {
          incomingMessages.push({
            author: data.data.author,
            message: data.data.message,
            timestamp: data.data.timestamp,
            key: data.path.substr(1)
          })
        }

        //Reverse sort messages by date so newest messages are rendered first
        incomingMessages.sort((a, b) => {
            return new Date(b.timestamp) - new Date(a.timestamp);
        })

        //Set state
        let newState = {...this.state};
        newState.messages = incomingMessages;
        console.log(newState);
        this.setState(newState);
      });

      let author = null;
      while(author === null){
        author = window.prompt("ユーザーネームをお選びください。");
      }
      console.log('author', author);
      let newState = {...this.state};
      newState.author = author;
      this.setState(newState);
  }

  onSendMessageHandler = (message) => {
    const messageData = {author: this.state.author, message: message, timestamp: new Date()}
    axios.post('https://japaneseverticalchat.firebaseio.com/messages.json', messageData)
      .catch((err) => {
        console.log('[error]', err);
      })
  }

  render() {
    return (
      <div className="App">
        <MessageInput sendMessage={this.onSendMessageHandler}/>
        <ChatLog messages={this.state.messages} userName={this.state.author}/>
      </div>
    );
  }
}

export default App;
