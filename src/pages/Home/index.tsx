import React, { useContext, useEffect, useState } from 'react'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import TextLoop from "react-text-loop"
import Helmet from 'react-helmet'

import './Home.scss'

import { Blog } from '../Blog'
import { RichText } from '../../components/RichText'
import { Article as IArticle, ArticleAge, getArticles } from '../../services/blogService'
import { Context } from '../../ContextProvider'

export const Home: React.FC = () => {
  const context = useContext(Context)

  const [loading, setloading] = useState(false)

  const [postAge, setPostAge] = useState<ArticleAge>('all')
  const [articles, setArticles] = useState<IArticle[]>(context.state.articles)
  
  useEffect(() => {
    if (articles.length === 0) {
      setloading(true)
      getArticles(postAge).then((items) => {
        setArticles(items)
        context.actions.SaveArticles(items)
        setloading(false)
      })
    }
  }, [ postAge ])
  
  return (
    <article>
      <Helmet>
        <title>IEEE JMI Student Branch</title>
      </Helmet>

      <section id="hero-home" className="container">
        <div id="title-block">
          <h1 className="regular">IEEE JMI</h1>
          <div>
            <h3>Student Branch Website</h3>
          </div>
        </div>
      </section>

      <section id="about-home" className="dark">
        <div id="about-holder">
          <div className="container">
            <h2>About Us</h2><br/>
            <p>
              IEEE and its members inspire a global community through highly-cited publications, 
              conferences, technology standards, and professional and educational activities. 
              IEEE is the trusted “voice” for engineering, computing, and technology information around the globe.
            </p>
            <p>
              We are one of the largest societies in Jamia Millia Islamia with over 200 members 
              and an active staff participation. We promote, encourage and assist technological 
              and cultural education in the students who join us.
            </p>
          </div>
        </div>
      </section>

      <section id="blog-home" className="container">
        <h2 className="huge-title">Blog</h2>

        {
          loading ? <h3>Loading</h3> : (
            articles.length === 0  ? (
              <h3>Sorry we haven't posted anything lately :(</h3>
            ) : null 
          )
        }

        {
          articles.slice(0,1).map((article)=>(
            <div key={article.id} className="article-current">
              <h2 className="regular">
                <Link to={`/blog/article/${article.id}`}>{article.title}</Link>
              </h2>
              <h3 className="regular">{ article.subtitle }</h3>

              <p className="metadata">
                Posted on { article.publishedOn && article.publishedOn.toDate().toDateString() }
              </p>

              <p className="exerpt">
                <RichText readonly 
                  content={ article.content.substr(0, article.content.substr(0, 250).lastIndexOf('.') + 1) } 
                />
              </p>
              <Link to={`/blog/article/${article.id}`}>Read more</Link>
            </div>
          ))
        }
      </section>
    </article>
  )
}

export default Home