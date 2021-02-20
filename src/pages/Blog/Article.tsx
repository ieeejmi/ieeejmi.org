import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'

import { RichText } from '../../components/RichText'
import { Context } from '../../ContextProvider'
import { Article as IArticle } from '../../services/blogService'

import './Blog.scss'

export const Article: React.FC<IArticle> = ({
  title,
  subtitle,
  content,
  publishedOn,
  id,
}) => {
  window.scrollTo(0, 0)

  const context = useContext(Context)

  return (
    <article className='container medium blog-article'>
      <Helmet>
        <title>{ title } | IEEE JMI</title>
      </Helmet>

      <h1 className='blog-article-title'>{title}</h1>
      <h2 className='blog-article-subtitle regular'>{subtitle}</h2>
      <p className='metadata'>
        <span>{publishedOn && publishedOn.toDate().toDateString()}</span>
        <span>
          {
            context.state.isAuth ? (
              <Link to={`/admin/blog/edit/${id}`}>[Edit]</Link>
            ) : null
          }
        </span>
      </p>
      <br />

      <RichText readonly content={content} />
    </article>
  )
}

export default Article
