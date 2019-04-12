import React from 'react';

const message = (props) => {
    let messageArray = props.message.split(/\n/);    
    let message = messageArray.map((messagePart, i) => <p key={i} className="messageLine">{messagePart}</p>)
    let messageClasses = ['message'];
    let authorClasses = ['messageAuthor'];
    if(props.isUser){
        messageClasses.push('author');
        authorClasses.push('author');
    }
    return(
        <div className={messageClasses.join(' ')}>
            <div>
                <p className={authorClasses.join(' ')}>{props.author}</p>
                {message}
            </div>
        </div>
    );
}

export default message;