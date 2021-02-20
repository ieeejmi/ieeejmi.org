import React, { useEffect, useState } from 'react'
import { Route } from 'react-router-dom'

import { AuthUser } from './services/authService'
import { Article } from './services/blogService'
import { Project } from './services/projectService'
import { Conversation } from './services/chatService'

const initContext = {
  state: {
    isAuth: false,
    authUser: Object(),
    articles: Array<Article>(),
    projects: Array<Project>(),
    conversations: Array<Conversation>()
  },
  actions: {
    SaveLogin: (user:AuthUser) => {},
    ClearLogin: () => {},
    SaveArticles: (articles:Array<any>) => {},
    SaveProjects: (projects:Array<any>) => {},
    SaveConversations: (conversations:Array<any>) => {},
    route: (path: string, state?: unknown) => {}
  }
}

export const Context = React.createContext(initContext)

export const ContextProvider: React.FC = ({ children }) => {
  const [contextState, setContextState] = useState(initContext)

  useEffect(() => {
    // Login from device
  }, [])

  function SaveLogin(user:AuthUser) {
    contextState.state.isAuth = true
    contextState.state.authUser = user
    setContextState(contextState)
  }

  function ClearLogin() {
    contextState.state.isAuth = false
    contextState.state.authUser = null
    setContextState(contextState)
  }

  function SaveArticles(articles:Array<any>) {
    contextState.state.articles = articles
    setContextState(contextState)
  }

  function SaveProjects(projects:Array<any>) {
    contextState.state.projects = projects
    setContextState(contextState)
  }

  function SaveConversations(conversations:Array<any>) {
    contextState.state.conversations = conversations
    setContextState(contextState)
  }

  return (
    <Route render={({ history })=>(
      <Context.Provider
        value={{
          ...contextState,
          actions: {
            SaveLogin, 
            ClearLogin,
            SaveArticles, 
            SaveProjects,
            SaveConversations,
            route: history.push 
          }
        }}
      >
        { children }
      </Context.Provider>
    )}/>
  )
}

export default ContextProvider