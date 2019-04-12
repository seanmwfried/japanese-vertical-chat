import React from 'react';

const messageInput = (props) => {

    const onKeyPressHandler = (event) => {
        let messageDrafter = document.getElementById('messageDrafter');
        let draft = messageDrafter.innerText

        if(event.keyCode === 13 && !event.shiftKey){
            event.preventDefault();
            props.sendMessage(draft);
            messageDrafter.textContent = '';
        }
    }
    
    return (
        <div className="testdiv" 
            id="messageDrafter" 
            contentEditable="true" 
            spellCheck="false"
            placeholder="ここに入力"
            onKeyDown={onKeyPressHandler}>
        </div>
    );
}

export default messageInput;