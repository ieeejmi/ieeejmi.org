import React from 'react'
import { Link } from 'react-router-dom'

import './Navbar.scss'

export const Navbar: React.FC = () => {
  return (
    <header>
      <h3 className="site-title">
        <Link to="/">IEEE JMI</Link>        
      </h3>

      <nav>
        <ul>
          <li><Link to="/blog">Blog</Link></li>
          <li><Link to="/projects">Projects</Link></li>
          <li><Link to="/team">Team</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar