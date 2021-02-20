import React, { useEffect, useState } from 'react'
import { Contact, deleteContact, getContacts } from '../../../services/chatService'

export const ContactManager = () => {
  const [contacts, setContacts] = useState<Contact[]>()
  const [isLoading, setIsLoading] = useState(true)

  function loadContacts() {
    getContacts().then((data)=>{
      setContacts(data)
      setIsLoading(false)
    })
  }

  useEffect(() => {
    setIsLoading(true)
    loadContacts()
  }, [])

  return (
    <section id="admin-contacts">
      <div className="admin-section-title">
        <h1 className="section-title">Contacts</h1>
      </div>

      <div id="contact-list">
        {
          !isLoading ? (
            contacts && contacts.map((contact)=>(
              <div className="card">
                <div className="details" style={{ flexGrow: 1 }}>
                  <span><b>{ contact.name },</b> { contact.orgn }  </span>
                  <br/>
                  <span style={{ color: '#888' }}>
                    <a href={`mailto:${ contact.mail }`}>{ contact.mail }</a>, { contact.telp }
                  </span>
                  <br/>
                  <span>{ contact.mesg }</span>
                </div>
                <div className="controls">
                  <button className="text" style={{ color: 'indianred' }}
                    onClick={()=>{
                      deleteContact(contact.id as string).then(()=>{
                        loadContacts()
                      })
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h3>Loading</h3>
          )
        }
      </div>
    </section>
  )
}
