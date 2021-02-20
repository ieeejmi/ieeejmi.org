import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Chat } from './Chat'
import { Email } from './Email'

import './Contact.scss'

export const Contact: React.FC = () => {
  return (
    <article className="container">
      <Helmet>
        <title>Contact | IEEE JMI</title>
      </Helmet>
      
      <h1 className="huge-title">Talk</h1>
      <p>
        Want to get in touch or just chat? Choose your mode of communication below. <br/>
        You can either chat right here or I can send you an email if you leave your details.
      </p>

      <Switch>
        <Route path="/contact/chat" component={Chat} />

        <Route path="/contact/mail" component={Email} />

        <Route>
          <section>
            <div>
              <h2>Start a Chat</h2>
              <p>
                If you'd like to <b>quickly discuss something</b> please choose the <Link to="/contact/chat">Chat with Me</Link> option. <br/>
                This helps you get a quicker response.
              </p>
              <button>
                <Link to="/contact/chat">Chat with Me</Link>
              </button>
            </div>
            <br/><br/>
            <div>
              <h3>Email Me Instead</h3>
              <p>
                If you have a longer discussion, <b>like a project</b> that you have mind and you'd like me to work on, 
                please choose the <Link to="/contact/mail">Get an Email</Link> option. Try and be specific in the message so that I can get back to you sooner.
                Hopefully you understand why I don't want to give out my email address on the internet.
              </p>
              <button className="outline">
                <Link to="/contact/mail">Get an Email</Link>
              </button>
            </div>
            <br/><br/>
            <p>
              With both of these options, there will still be some turnaround time. <br/>
              I try my best to make this as short as possible.
            </p>
          </section>
        </Route>
      </Switch>
    </article>
  )
}

export default Contact
