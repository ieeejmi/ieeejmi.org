import React from 'react'

import './Team.scss'

export const index = () => {
  return (
    <article className="container">
      <h1>Team</h1>

      <section className="center">
        <h2>Dr. Ahteshamul Haque</h2>
        <p>Branch Councellor</p>
      </section>

      <section className="flexbox flex-row">
        <div className="left">
          <h2>Alisamar Husain</h2>
          <p>Chairperson</p>
        </div>
        <div className="center">
          <h2>Alisamar Husain</h2>
          <p>Vice Chairperson</p>
        </div>
        <div className="right">
          <h2>Alisamar Husain</h2>
          <p>Vice Chairperson</p>
        </div>
      </section>
    </article>
  )
}

export default index;