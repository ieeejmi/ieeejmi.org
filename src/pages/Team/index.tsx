import React from 'react'
import Helmet from 'react-helmet'
import './Team.scss'

export const index = () => {

  return (

    <article className="container">

    <Helmet> 
      <title> IEEEJMI | Team</title>
    </Helmet>

      <h1 className="text-secondary">Team</h1>

      <section>
        <h2 className = "text-dark">Dr. Ahteshamul Haque</h2>
        <h1 className="badge bg-secondary">Branch Counsellor</h1><br />
        <h1 className="badge bg-secondary">IEEEJMI Sudent Branch</h1>
      </section>

      <hr />

      <section className="d-flex justify-content-between">
        <div>
          <h2 className = "text-dark">Alisamar Husain</h2>
          <span className="badge bg-secondary "> IEEEJMI Sudent Branch</span><br />
          <span className="badge bg-secondary">Chairperson</span>
        </div>
      </section>

      <hr />

      <section className="d-flex justify-content-between">
        <div>
          <h2 className = "text-dark">Nadia Mukhtar</h2>
          <span className="badge bg-secondary "> IEEEJMI Sudent Branch</span><br />
          <span className="badge bg-secondary">Vice Chairperson</span>
        </div>
        <div >
          <h2 className = "text-dark">Hammad Mohammad Shakir</h2>
          <span className="badge bg-secondary"> IEEEJMI Sudent Branch</span><br />
          <span className="badge bg-secondary">Vice Chairperson</span>
        </div>
      </section>

      <hr />

      <section className="d-flex justify-content-between">
        <div>
          <h2 className = "text-dark">Zehra Fatima</h2>
          <span className="badge bg-secondary"> IEEEJMI Sudent Branch </span><br />
          <span className="badge bg-secondary">General Secretary</span>
        </div>
        <div >
          <h2 className = "text-dark">Syed Mohammad Hamza</h2>
          <span className="badge bg-secondary">IEEEJMI Student Branch</span><br />
          <span className="badge bg-secondary">General Secretary</span>
        </div>
      </section>

      <hr />

      <section className="d-flex justify-content-between">
        <div>
          <h2 className = "text-dark">Noaima Bari</h2>
          <span className="badge bg-secondary">Women in Engineering Affinity Group</span><br />
          <span className="badge bg-secondary">Chairperson</span>
        </div>
      </section>

      <hr />

      <section className="d-flex justify-content-between" >
        <div>
          <h2 className = "text-dark">Sankalp Arora</h2>
          <span className="badge bg-secondary">Computer Society Chapter</span><br />
          <span className="badge bg-secondary">Chairperson</span>
        </div>
        <div >
          <h2 className = "text-dark">Bilal Naqvi</h2>
          <span className="badge bg-secondary">Computer Society Chapter</span><br />
          <span className="badge bg-secondary">Secretary</span>
        </div>
      </section>

      <hr />

      <section className="d-flex justify-content-between">
        <div >
          <h2 className = "text-dark">Mohd Saud</h2>
          <span className="badge bg-secondary">Industry Application Society</span><br />
          <span className="badge bg-secondary">Chairperson</span>
        </div>
      </section>

      <hr />

      <section className="d-flex justify-content-between">
        <div >
          <h2 className = "text-dark">Shadab Faisal</h2>
          <span className="badge bg-secondary">Power and Energy Society Chapter</span><br />
          <span className="badge bg-secondary">Chairperson</span>
        </div>
      </section>
      <hr />
    </article>
  )
}

export default index;