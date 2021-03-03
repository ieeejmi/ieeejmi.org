import React from 'react'
import Helmet from 'react-helmet'
import './Team.scss'

export const index = () => {

  return (

    <article className="container">

    <Helmet> 
      <title> Team | IEEEJMI </title>
    </Helmet>

      <h1>Team</h1>

      <section className = "team-section">
        <div>
          <h2>Dr. Ahteshamul Haque</h2>
          <span className = "span-badge"> IEEEJMI Student Branch</span><br/>
          <span className = "span-badge">Branch Counsellor</span>
        </div>
      </section>

      <hr />

      <section className = "team-section">
        <div>
          <h2>Alisamar Husain</h2>
          <span className = "span-badge"> IEEEJMI Student Branch</span><br />
          <span className = "span-badge">Chairperson</span>
        </div>
      </section>

      <hr />

      <section className = "team-section">
        <div>
          <h2 >Nadia Mukhtar</h2>
          <span className = "span-badge"> IEEEJMI Student Branch</span><br/>
          <span className = "span-badge">Vice Chairperson</span>
        </div>
        <div >
          <h2 >Hammad Mohammad Shakir</h2>
          <span className = "span-badge"> IEEEJMI Student Branch</span><br />
          <span className = "span-badge">Vice Chairperson</span>
        </div>
      </section>

      <hr />

      <section className = "team-section">
        <div>
          <h2>Zehra Fatima</h2>
          <span className = "span-badge"> IEEEJMI Student Branch </span><br />
          <span className = "span-badge">General Secretary</span>
        </div>
        <div >
          <h2 >Syed Mohammad Hamza</h2>
          <span className = "span-badge">IEEEJMI Student Branch</span><br />
          <span className = "span-badge">General Secretary</span>
        </div>
      </section>

      <hr />

      <section className = "team-section">
        <div>
          <h2 >Noaima Bari</h2>
          <span className = "span-badge">Women in Engineering Affinity Group</span><br />
          <span className = "span-badge">Chairperson</span>
        </div>
      </section>

      <hr />

      <section  className = "team-section">
        <div>
          <h2 >Sankalp Arora</h2>
          <span className = "span-badge">Computer Society Chapter</span><br />
          <span className = "span-badge">Chairperson</span>
        </div>
        <div >
          <h2 >Bilal Naqvi</h2>
          <span className = "span-badge">Computer Society Chapter</span><br />
          <span className = "span-badge">Secretary</span>
        </div>
      </section>

      <hr />

      <section className = "team-section">
        <div >
          <h2>Mohd Saud</h2>
          <span className = "span-badge">Industry Application Society</span><br />
          <span className = "span-badge">Chairperson</span>
        </div>
      </section>

      <hr />

      <section className = "team-section">
        <div >
          <h2 >Shadab Faisal</h2>
          <span className = "span-badge">Power and Energy Society Chapter</span><br />
          <span className = "span-badge">Chairperson</span>
        </div>
      </section>
  
      <hr />

    </article>
  )
}

export default index;