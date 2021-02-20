import React, { useState } from 'react'
import { createContact } from '../../services/chatService'

export const Email: React.FC = () => {
  const [name, setName] = useState<string>()
  const [orgn, setOrgn] = useState<string>()
  const [mail, setMail] = useState<string>()
  const [telp, setTelp] = useState<string>()
  const [mesg, setMesg] = useState<string>()

  const [isCreated, setIsCreated] = useState(false)

  function submit() {
    if (!name)
      return alert('Please enter your name')
    if (!mail)
      return alert('Please enter your email')
    if (!mesg)
      return alert('Please enter a message')
      
    createContact({
      name, orgn, mail, telp, mesg
    }).then(()=>{
      setIsCreated(true)
    })
  }

  if (!isCreated)
    return (
      <section id="leave-your-card" className="container small">
        <h2 className="regular">Leave your card</h2>
        <p>Please leave your contact details here and I will get back to you with an email as soon as possible.</p>
        <br/>

        <div className="card">
          <input id="name" name="name" className="full-width transparent" 
            style={{ fontSize: '1.5em', fontWeight: 'bolder' }}
            type="text" placeholder="Your Name"
            onChange={({ target })=>{
              setName(target.value)
            }}
          />
          <input id="orgn" name="orgn" className="full-width transparent"
            style={{ fontSize: '1.25em' }}
            type="text" placeholder="Your Organization"
            onChange={({ target })=>{
              setOrgn(target.value)
            }}
          />
          <br/>

          <input id="mail" name="mail" className="full-width transparent" 
            type="email" placeholder="Email"
            onChange={({ target })=>{
              setMail(target.value)
            }}
          />
          <input id="telp" name="telp" className="full-width transparent" 
            type="tel" placeholder="Phone (Optional)"
            onChange={({ target })=>{
              setTelp(target.value)
            }}
          />
          <br/>

          <input id="mesg" name="mesg" className="full-width transparent" 
            type="text" placeholder="Message"
            style={{ fontSize: '1.25em' }}
            onChange={({ target })=>{
              setMesg(target.value)
            }}
          />
        </div>
        <br/>
          
        <button className="full-width" onClick={submit}>
          Submit
        </button>
      </section> 
    )
  else
    return (
      <section id="leave-your-card" className="container xsmall">
        <h2 className="regular">Thanks!</h2>
        <p>
          Thanks for getting in touch. I'll be sending an email soon! <br/>
          <b>Hope this is the start of something nice.</b>
        </p>
      </section>
    )
}
