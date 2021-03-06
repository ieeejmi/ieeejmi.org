import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import './Admin.scss'

import NotFound from '../../components/NotFound'

import { BlogManager } from './Blog/BlogManager'
import { BlogEditor } from './Blog/BlogEditor'
import { ProjectEditor } from './Projects/ProjectEditor'
import { ProjectsManager } from './Projects/ProjectManager'
import { ContactManager } from './Contact/ContactManager'
import { ChatManager } from './Contact/ChatManager'
import { SettingsManager } from './Settings/SettingsManager'

export const Admin: React.FC = () => {
  return (
    <article className="container">
      <Helmet>
        <title>Admin | IEEE JMI</title>
      </Helmet>

      <h1 className="huge-title">Admin Panel</h1>

      <div className="admin-panel">
        <div className="admin-nav">
          <div className="admin-nav-link">
            <Link to="/admin/blog">Blog</Link>
          </div>

          <div className="admin-nav-link">
            <Link to="/admin/projects">Projects</Link>
          </div>

          <div className="admin-nav-link">
            <Link to="/admin/contact">Contacts</Link>
          </div>

          <div className="admin-nav-link">
            <Link to="/admin/access">Access</Link>
          </div>

          <div className="admin-nav-link">
            <Link to="/admin/settings">Settings</Link>
          </div>
        </div>
        
        <div className="admin-control">
          <Switch>
            <Route path="/admin/blog/write">
              <BlogEditor intent="write"/>
            </Route>            
            <Route path="/admin/blog/edit/:articleId" render={(routeprops)=>(
              <BlogEditor intent="edit" articleId={routeprops.match.params['articleId']} />
            )} />
            <Route path="/admin/blog" component={BlogManager} />


            <Route path="/admin/projects/create">
              <ProjectEditor intent="create"/>
            </Route>
            <Route path="/admin/projects/edit/:projectId" render={(routeprops)=>(
              <ProjectEditor intent="edit" projectId={routeprops.match.params['projectId']} />
            )} />
            <Route path="/admin/projects" component={ProjectsManager} />


            {/* <Route path="/admin/contact/chat" component={ChatManager} /> */}
            <Route path="/admin/contact" component={ContactManager} />

            <Route path="/admin/settings" component={SettingsManager} />

            <Route exact path="/admin">
              <div className="admin-section-title">
                <h1 className="section-title">
                  Home
                </h1>
              </div>

              <p>
                Welcome to the Admin Panel. <br/>
                Select an item from the side list.
              </p>
            </Route>

            <Route path="/admin">
              <NotFound/>
            </Route>
          </Switch>
        </div>
      </div>
    </article>
  )
}

export default Admin