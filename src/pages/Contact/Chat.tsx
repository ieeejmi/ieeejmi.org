import React, { useEffect, useState } from 'react'

import { config as FirebaseConfig, notifications } from '../../services/database'
import { createConversation, MAX_USER_MSGS, sendMessage, subscribeToConvByUserId, subscribeToConversation } from '../../services/chatService'
import { Message } from '../../services/chatService'

export const Chat: React.FC = () => {
  const [username, setUsername] = useState<string>()
  const [convId, setConvId] = useState<string>()
  const [messages, setMessages] = useState<Message[]>([])
  const [unsubscribe, setUnsubscribe] = useState<Function>(Function)

  const [isLoading, setIsLoading] = useState(true)
  const [isConvReady, setIsConvReady] = useState(false)
  const [isErrorState, setIsErrorState] = useState(false)

  function onMessage(update:Message[]) {
    setMessages(update)
    scrollToLast()
  }

  function onError(err:Message) {
    setIsErrorState(true)
    messages.push(err)
    setMessages(messages)
  }

  const [text, setText] = useState<string>()
  function send() {
    if (convId && text)
      sendMessage(convId, text, 'user').then(()=>{
        setText('')
      })
  }

  useEffect(() => {
    const user = localStorage.getItem('userId')
    const device = localStorage.getItem('deviceId')

    if (user && device)
      subscribeToConvByUserId(user, onMessage, onError).then((conv)=>{
        if (conv) {
          setConvId(conv.convId as string)
          setUsername(conv.userDisplay as string)
          setMessages(conv.messages as Message[])
          setUnsubscribe(conv.unsub)
          setIsConvReady(true)
          setIsLoading(false)
          scrollToLast()
        }
      })
    else
      setIsLoading(false)
  }, [])

  function newConversation() {
    if (username) {
      createConversation(username).then(({ id })=>{
        subscribeToConversation(id, onMessage, onError).then((conv)=>{
          if (conv) {
            setConvId(conv.convId as string)
            setMessages(conv.messages as Message[])
            setUnsubscribe(conv.unsub)
            setIsConvReady(true)
            scrollToLast()
          }
        })

        // const { vapidKey } = FirebaseConfig
        // notifications.getToken({ vapidKey }).then((currentToken) => {
        //   if (currentToken) {
        //     // Send the token to your server and update the UI if necessary
        //     // ...
        //   } else {
        //     // Show permission request UI
        //     console.log('No registration token available. Request permission to generate one.')
        //     // ...
        //   }
        // }).catch((err) => {
        //   console.log('An error occurred while retrieving token. ', err)
        //   // ...
        // });
      })
    }
  }
  
  function scrollToLast() {
    var list = document.getElementById("message-box")
    if(list)
      list.scrollTop = list.offsetHeight
  }

  return (
    <section>
      <p></p>
      {
        !isLoading ? (
          isConvReady ? (
            <div id="chatbox" className="container small">
              <h1 className="regular">Chat</h1>

              <div id="message-box">
                {
                  messages.map((message, index) =>(
                    <div key={convId as string + index} className={`message from-${message.sentBy}`}>
                      <p>{ message.content }</p>
                      <span className="timestamp">
                        { message.sentOn.toDate().toLocaleTimeString() } <br/>
                        { message.sentOn.toDate().toLocaleDateString() }
                      </span>
                    </div>
                  ))
                }
              </div>

              <input className="full-width transparent" type="text" 
                placeholder="Type your message"
                value={text} autoFocus
                onChange={({ target, }) => setText(target.value)} 
                onKeyDown={({ key, shiftKey }) => {
                  if (shiftKey && key === 'Enter')
                    send()
                }} 
              />
              
              <p style={{ color: '#888', fontSize: 'small', textAlign: 'right' }}>
                This chat will be auto-limited after {MAX_USER_MSGS} messages. <br/>
                Try to put your thoughts in a single message.
              </p>
            </div>
          ) : (
            <div className="container xsmall">
              <p>Enter your name to start this chat.</p>
              <input className="full-width" type="text" 
                placeholder="Your Name" autoComplete="on" 
                onChange={({ target }) => setUsername(target.value)} 
              />
              <button className="full-width" onClick={newConversation}>Lets Talk</button>
            </div>
          )
        ) : (
          <h3>Loading</h3>
        )
      }

      {
        isErrorState ? (
          <div>Error Occurred</div>
        ) : null
      }
    </section>
  )
}
