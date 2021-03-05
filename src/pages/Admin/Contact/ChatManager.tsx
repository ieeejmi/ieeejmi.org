import React, { useContext, useEffect, useState } from 'react'

import '../../Contact/Contact.scss'

import { Context } from '../../../ContextProvider'
import env from '../../../env'

import { deleteConversation, getActiveConversations, sendMessage, subscribeToConvByUserId, permanentlyDeleteConversation } from '../../../services/chatService'
import { Conversation, Message } from '../../../services/chatService'

export const ChatManager = () => {
  const context = useContext(Context)

  const [conversations, setConversations] = useState<Conversation[]>(context.state.conversations)
  const [selectedConv, setSelectedConv] = useState<Conversation>()
  
  const [convId, setConvId] = useState<string>()
  const [messages, setMessages] = useState<Message[]>([])
  const [unsubscribe, setUnsubscribe] = useState<Function>(Function)

  const [isConvReady, setIsConvReady] = useState(false)
  // const [isErrorState, setIsErrorState] = useState(false)

  function onMessage(update:Message[]) {
    setMessages(update)
    scrollToLast()
  }

  function onError(err:Message) {
    // setIsErrorState(true)
    messages.push(err)
    setMessages(messages)
  }

  const [text, setText] = useState<string>()
  function send() {
    if (convId && text)
      sendMessage(convId, text, 'root').then(()=>{
        setText('')
      })
  }
  
  useEffect(() => {
    localStorage.setItem('deviceId', env.chat.masterkey)
    getActiveConversations().then((list)=>{
      setConversations(list)
      context.actions.SaveConversations(list)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (selectedConv)
      subscribeToConvByUserId(selectedConv.userId, onMessage, onError).then((conv)=>{
        if (conv) {
          setConvId(conv.convId as string)
          setMessages(conv.messages as Message[])
          setUnsubscribe(conv.unsub as Function)  
          setIsConvReady(true)
          scrollToLast()
        }
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ selectedConv ])

  function scrollToLast() {
    var list = document.getElementById("message-box")
    if(list)
      list.scrollTop = list.offsetHeight
  }

  return (
    <section id="admin-chat">
      <div className="admin-section-title">
        <h1 className="section-title">Chat</h1>
      </div>      

      <div id="admin-chatbox">
        <div id="chat-list">
          {
            conversations && conversations.map((conversation)=>(
              <div key={conversation.userId} className="chat"
                onClick={()=> setSelectedConv(conversation)}
                style={{
                  backgroundColor: selectedConv?.userId === conversation.userId ? "#ccc" : "inherit"
                }}
              >
                {/* <h2 className={selectedConv?.userId === conversation.userId ? "" : "regular"}> */}
                <h2 className="regular">
                  { conversation.userDisplay }
                </h2>
                <p className="timestamp">
                  { conversation.createdOn.toDate().toDateString() } <br/>
                  { conversation.createdOn.toDate().toLocaleTimeString() } 
                </p>
              </div>
            ))
          }
        </div>

        <div id="chat-messages">          
          {
            isConvReady ? (
              <div id="chatbox" className="container">
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

                  {
                    messages.length === 0 ? (
                      <div>
                        <h3 className="regular">Start a Conversation</h3>
                      </div>
                    ) : null
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

                <div>
                  <button onClick={()=>{ deleteConversation(convId as string) }}>
                    Archive
                  </button>

                  <button className="outline"
                    onClick={()=>{ permanentlyDeleteConversation(convId as string) }} // && unsubscribe()
                  >
                    Delete
                  </button>
                </div>
              </div>
            ) : (
              <p id="no-conv">Select a Conversation</p>
            )
          }
        </div>
      </div>
    </section>
  )
}
