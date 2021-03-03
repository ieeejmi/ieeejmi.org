import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link, Redirect, Route } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { Article } from './Article'
import NotFound from '../../components/NotFound'

import { Context } from '../../ContextProvider'
import { RichText } from '../../components/RichText'
import { getArticleById, getArticles } from '../../services/blogService'
import { Article as IArticle, ArticleAge, } from '../../services/blogService'

import './Blog.scss'

export const Blog: React.FC = () => {
  const context = useContext(Context)

  const [loading, setLoading] = useState(false)

  const [postAge, setPostAge] = useState<ArticleAge>('all')
  const [articles, setArticles] = useState<IArticle[]>(context.state.articles)
 
  const fetchArticles = useCallback(async () => {
    setLoading(true)
    const items = await getArticles(postAge)
    setArticles(items)
    context.actions.SaveArticles(items)
    setLoading(false)
  }, [])

  useEffect(() => {
    if (articles.length === 0) {
      fetchArticles()
    }
  }, [articles.length, fetchArticles, postAge])

  if (loading)
    return <article className="container center">
      <h3>Loading</h3>
    </article>
  else
    return (
      <>
        <Route exact path="/blog">
          <article className="container blog">
            <Helmet>
              <title>Blog | IEEE JMI</title>
            </Helmet>

            <h1 className="huge-title">Blog</h1>
            <p>
              
            </p>

            {
              loading ? <h3>Loading</h3> : (
                articles.length === 0  ? (
                  <h3>Sorry we haven't posted anything lately :(</h3>
                ) : null 
              )
            }

            {
              // (postAge === 'recent') && 
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
            
            <div className="article-search">
              {
                articles.length > 1  ? (<>
                  <h3>Other Articles</h3> <hr/>
                  {/* <input className="full-width" type="text" placeholder="Search Post" autoComplete="off" /> */}
                </>) : null 
              }
            </div>

            <div className="article-list">
              {
                articles.slice(1).map((article)=>(
                  <div key={article.id} className="article-list-item">
                    <h2 className="regular">
                      <Link to={`/blog/article/${article.id}`}>{ article.title }</Link>
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
                  </div>
                ))
              }
            </div>
          </article>
        </Route>

        <Route path="/blog/article/:articleId" 
          render={(routeprops)=>{
            for (const article of articles)
              if (article.id === routeprops.match.params['articleId']) {
                return <Article { ...article } />
              }

            if (!articles)
              fetchArticles()

            return <NotFound/>
          }}
        />
      </>
    )
}

export default Blog
