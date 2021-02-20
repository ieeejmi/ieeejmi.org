import React from 'react'
import { Link } from 'react-router-dom'

export const ProjectsManager = () => {
  return (
    <section>
      <div className="admin-section-title">
        <h1 className="section-title">Projects Manager</h1>
        <button>
          <Link to="/admin/projects/create">New Project</Link>
        </button>
      </div>
    </section>
  )
}
