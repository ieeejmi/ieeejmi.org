import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { PrivateRoute } from './components/PrivateRoute'

import './App.scss'
import ContextProvider from './ContextProvider'

import Navbar from './components/Navbar'
import Footer from './components/Footer'
import NotFound from './components/NotFound'

import Blog from './pages/Blog'
import Home from './pages/Home'
import Login from './pages/Login'
import Projects from './pages/Projects'
import Admin from './pages/Admin'
import Contact from './pages/Contact'
import Team from './pages/Team'

export const App: React.FC = () => {
  return (
    <Router>
      <ContextProvider>
        <Navbar/>

        <Switch>
          <Route exact path="/" component={Home} />
          
          <Route path="/blog" component={Blog} />
          <Route path="/team" component={Team} />
          <Route path="/login" component={Login} />
          {/* <Route path="/projects" component={Projects} /> */}
          <Route path="/contact" component={Contact} />
          
          <PrivateRoute path="/admin" component={Admin} />

          <Route>
            <NotFound/>
          </Route>
        </Switch>

        <Footer/>
      </ContextProvider>
    </Router>
  )
}

export default App
