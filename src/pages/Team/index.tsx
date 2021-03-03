import React from 'react'
import Helmet from 'react-helmet'

import './Team.scss'

export const Team: React.FC = () => {
  return (
    <article className="container">
      <Helmet> 
        <title> Team | IEEE JMI </title>
      </Helmet>

      <h1 className="huge-title">Team</h1>
      <p>
        
      </p>

      <section className="team-section">
        <div className="container flexbox flex-row">
          <div className="team-member">
            <h3>Alisamar Husain</h3>
            <p>Chairperson</p>
          </div>
          <div className="team-member">
            <h3>Nadia Mukhtar</h3>
            <p>Vice Chairperson</p>
          </div>
          <div className="team-member">
            <h3>Hammad Shakir</h3>
            <p>Vice Chairperson</p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container flexbox flex-row">
          <div className="team-member">
            <h3>Zehra Fatima</h3>
            <p>General Secretary</p>
          </div>
          
          <div className="team-member">
            <h3>Syed Mohammad Hamza</h3>
            <p>General Secretary</p>
          </div>
        </div>
      </section>
      <hr/>

      <section className="team-section">
        <h2>Women in Engineering Affinity Group</h2>
        <div className="container team-member">
          <h3>Noaima Bari</h3>
          <p>
            Chairperson <br/>
            Women in Engineering Affinity Group
          </p>
        </div>
      </section>

      <section className="team-section">
        <h2>Computer Society Chapter</h2>
        <div className="container flexbox flex-row">
          <div className="team-member">
            <h3>Sankalp Arora</h3>
            <p>
              Chairperson <br/>
              Computer Society Chapter
            </p>
          </div>

          <div className="team-member">
            <h3>Bilal Naqvi</h3>
            <p>
              Secretary <br/>
              Computer Society Chapter
            </p>
          </div>
        </div>
      </section>

      <section className="team-section">
        <h2>Power Electronics Society Chapter</h2>
        <div className="container team-member">
          <h3>Mohd Saud</h3>
          <p>
            Chairperson <br/>
            Power Electronics Society Chapter
          </p>
        </div>
      </section>
      <hr/>

      <section className="team-section">
        <h2>Executive Team</h2>
        <div className="container flexbox flex-row">
          <div className="team-member">
            <h3>Fakhra Najm </h3>
            <p>Technology and Development</p>
          </div>

          <div className="team-member">
            <h3>Almas Ansari</h3>
            <p>Operations and Management</p>
          </div>

          <div className="team-member">
            <h3>Rishima</h3> {/* Mehrotra */}
            <p>Operations and Management</p>
          </div>

          <div className="team-member">
            <h3>Aaliya Ziya</h3>
            <p>Operations and Management</p>
          </div>
        </div>
      </section>
        
      <hr/>
    </article>
  )
}

export default Team;