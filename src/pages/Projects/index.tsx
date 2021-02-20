/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { Category } from './Category'

import { Display } from './Display'

import './Projects.scss'

export const Projects = () => {
  return (
    <article id="projects" className="container">
      <h1 className="huge-title">Work</h1>
      <p>
        This is a list of stuff I've made over the years.
      </p>

      <Switch>
        <Route path="/projects/:category/:id" component={Display} />
        <Route path="/projects/:category" component={Category} />
        <Route>
          <section className="project-container">
            <h2 className="regular">
              <Link to="/projects/category" id="category">Category</Link>
            </h2>

            <div>

            </div>

          </section>
        </Route>
      </Switch>
    </article>
  )
}

export default Projects