import React, { useCallback, useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Dialog } from '../../../components/Dialog'

import { Context } from '../../../ContextProvider'
import { listArticles, deleteArticle, updateArticle, permanentlyDeleteArticle } from '../../../services/blogService'
import { Article, ArticleAge, } from '../../../services/blogService'

export const BlogManager: React.FC = () => {
  const context = useContext(Context)

  const [postAge, setPostAge] = useState<ArticleAge>('recent')
  const [articles, setArticles] = useState<Article[]>(context.state.articles)
  
  const [loading, setLoading] = useState(true)
  // const [deleteDialog, openDeleteDialog] = useState(false)

  const fetchArticles = useCallback(() => {
    listArticles().then((items)=>{
      setArticles(items)
      context.actions.SaveArticles(items)
      setLoading(false)
    })
  }, [])

  useEffect(()=>{
    setLoading(true)
    fetchArticles()
  }, [fetchArticles, postAge])

  return (
    <section id="admin-blog">
      <div className="admin-section-title">
        <h1 className="section-title">Blog Manager</h1>
        <button>
          <Link to="/admin/blog/write">New Article</Link>
        </button>
      </div>

      <div id="blog-mgr-controls">

      </div>

      <div id="admin-article-list">
        {
          loading ? (
            <div>Loading</div>
          ) : (
            articles.map((article)=>(
              <div className="admin-article" key={article.id}>
                <div className="title-box">
                  <h2 className="regular" style={article.isDeleted ? { color: "gray" } : {} }>
                    <Link to={`/blog/article/${article.id}`}>
                      { article.title } 
                    </Link>
                  </h2>
                  <h3 className="regular">{ article.subtitle }</h3>
                </div>
                
                <div className="controls">
                  <span style={{ textAlign: 'left', color: '#888' }}>
                    { article.createdOn && article.createdOn.toDate().toDateString() } 
                  </span>
                  <div>
                    { !article.isDeleted ? (
                        <span style={{ marginRight: '1em', cursor: 'pointer' }}>
                          <Link to={`/admin/blog/edit/${article.id}`}>
                            Edit
                          </Link>
                        </span>
                      ) : null 
                    }

                    { article.isDeleted ? (
                        <span style={{ marginRight: '1em', color: 'darkgray', cursor: 'pointer' }}
                          onClick={async () => {
                            await updateArticle(article.id as string, {
                              isDeleted: false
                            })
                            fetchArticles()
                          }}
                        >
                          <b>Restore</b>
                        </span>
                      ) : (
                        <span style={{ marginRight: '1em', color: 'darksalmon', cursor: 'pointer' }}
                          onClick={async () => {
                            await deleteArticle(article.id as string)
                            fetchArticles()
                          }}
                        >
                          <b>Archive</b>
                        </span>
                      )
                    }

                    <span style={{ color: 'indianred', cursor: 'pointer' }}
                      onClick={async () => {
                        await permanentlyDeleteArticle(article.id as string)
                        fetchArticles()
                        // openDeleteDialog(true)
                      }}
                    >
                      <b>Delete</b>
                    </span>

                    {/* <Dialog open={deleteDialog} title="Confirm Delete"
                      message="Are you sure you want to permanently delete this article?" 
                      options={[
                        {
                          type: 'main',
                          text: 'Delete',
                          onChoose: () => {
                            deleteArticle(article.id as string).then(()=>{
                              openDeleteDialog(false)
                            })
                          }
                        },
                        {
                          type: 'secondary',
                          text: 'Cancel',
                          onChoose: () => {
                            openDeleteDialog(false)
                          }
                        }
                      ]}
                    /> */}
                  </div>
                </div>
              </div>
            ))
          )
        }
      </div>
    </section>
  )
}
