import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../../ContextProvider'

import { auth } from '../../../services/database'
import { getSocialHandles } from '../../../services/settingsService'

export const SettingsManager = () => {
  const [social, setSocial] = useState()
  
  const context = useContext(Context)

  useEffect(() => {
    getSocialHandles().then((handles)=>{
      setSocial(handles)
      console.log(handles);
    })
  }, [])

  async function logout() {
    await auth.signOut()
    context.actions.route('/admin')
  }

  return (
    <section id="">
      <div className="admin-section-title">
        <h1 className="section-title">Settings</h1>
      </div>

      <button onClick={logout}>Logout</button>

      {/* { context.state.authUser.hasPermission('Superuser') ? (
          <div className="admin-nav-link">
            <Link to="#">Access</Link>
          </div>
        ) : null
      } */}
    </section>
  )
}
