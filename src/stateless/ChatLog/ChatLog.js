import React from 'react';
import Message from './Message/Message';

const chatLog = (props) => {
    return(
        <div id="chatLog">
            <div>
                {props.messages.map((message) => (
                    <Message key={message.key}
                        author={message.author} 
                        message={message.message} 
                        isUser={message.author === props.userName}/>
                ))}
            </div>
        </div>
    );
}

export default chatLog;