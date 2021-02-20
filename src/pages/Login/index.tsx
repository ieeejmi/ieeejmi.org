import React, { useContext, useEffect, useState } from 'react'
import { Redirect, RouteProps } from 'react-router-dom'
import { Dialog } from '../../components/Dialog'
import { Context } from '../../ContextProvider'

import * as firebaseui from 'firebaseui'
import { auth } from '../../services/database'
import { authLogin, signInOptions } from '../../services/authService'

import './Login.scss'

const ui = new firebaseui.auth.AuthUI(auth) 

export const Login: React.FC<RouteProps> = ({ location }) => {
  const [user, setuser] = useState<string>()
  const [pass, setpass] = useState<string>()

  const [isLoginSuccessful, setLoginSuccessful] = useState(false)
  const [isLoginFailed, setIsLoginFailed] = useState(false)

  const context = useContext(Context)
  
  useEffect(() => {
    ui.start('#firebaseui-auth-container', { signInOptions })

    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const authUser = await authLogin(user.uid)
        context.actions.SaveLogin(authUser) 
        setLoginSuccessful(true)
      } 
      else
        context.actions.ClearLogin()  
    })
  }, [])
  
  const loginWithPassword = async () => {  
    try {
      await auth.signInWithEmailAndPassword(user as string, pass as string)
    } catch (error) {
      console.error(error)
      setIsLoginFailed(true)
    }
  }

  const params = new URLSearchParams(location?.search);
  if (isLoginSuccessful && location)
    return <Redirect to={params.get('r') as string} />

  return (
    <article className="container xsmall">
      <div id="login-box">
        <h1>Login</h1>
        <h2>Retricted Content</h2>

        <div className="input-group">
          <input className="full-width" type="text" onChange={e =>{ setuser(e.target.value) }} placeholder="Email" />
          <input className="full-width" type="password" onChange={e =>{ setpass(e.target.value) }} placeholder="Password" />
        </div>
        <button className="full-width" onClick={loginWithPassword}>Login</button>
        
        <div id="firebaseui-auth-container"></div>
      </div>

      <Dialog open={isLoginFailed}
        title="Login Failed" message="Invalid Username or Password"
        options={[
          {
            type: 'main', text: 'Okay',
            onChoose: () => {
              setIsLoginFailed(false)
            }
          }
        ]}
      />
    </article>
  )
}

export default Login
