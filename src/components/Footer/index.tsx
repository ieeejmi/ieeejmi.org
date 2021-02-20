import React from 'react'
import { Link } from 'react-router-dom'

import './Footer.scss'

export const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div>
          <h3>IEEE Jamia Millia Islamia</h3>
          <h3 className="regular">Website and Blog</h3>
          <p>All Rights Reserved</p>
        </div>
        <div className="flexbox flex-row">
          <span><Link to="/privacy">Privacy Policy</Link></span>
          <span><Link to="/admin">Admin</Link></span>
        </div>
      </div>
    </footer>
  )
}

export default Footer