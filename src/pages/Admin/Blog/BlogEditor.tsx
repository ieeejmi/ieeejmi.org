import React, { useContext, useEffect, useState } from 'react'
import { RichText } from '../../../components/RichText'
import { Context } from '../../../ContextProvider'
import { Article, getArticleById, publishArticle, saveDraftArticle, updateArticle } from '../../../services/blogService'

interface BlogEditorProps {
  intent: 'write' | 'edit'
  articleId?: string
}

export const BlogEditor: React.FC<BlogEditorProps> = ({ intent, articleId }) => {
  const [title, setTitle] = useState<string>(String())
  const [subtitle, setSubtitle] = useState<string>(String())
  const [content, setcontent] = useState<string>(String())

  const [loading, setloading] = useState(true)

  const context = useContext(Context)

  useEffect(() => {
    function setArticleContent(article: Article) {
      setTitle(article.title as typeof title)
      setSubtitle(article.subtitle as typeof subtitle)
      setcontent(article.content as typeof content)
      setloading(false)
    }

    if (intent==='edit') {
      if (context.state.articles.map(art => art.id).includes(articleId))
        for (const article of context.state.articles) {
          if (article.id === articleId)
            setArticleContent(article)
            
          continue
        }
      else 
        getArticleById(articleId as string).then((article)=>{
          setArticleContent(article)
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    articleId, intent
  ])

  return (
    <section id="admin-blog-editor">
      <div className="admin-section-title">
        <h1 className="section-title regular">Blog Editor</h1>

        {
          intent === 'write' ? (
            <>
              <button className="outline"
                onClick={_ => {
                  if(title)
                    saveDraftArticle({
                      title, subtitle, content
                    }).then(()=>{
                      context.actions.route('/admin/blog')
                    })
                }}
              >
                Save Draft
              </button>
              
              <button
                onClick={_ => {
                  if(title)
                    publishArticle({
                      title, subtitle, content
                    }).then(()=>{
                      context.actions.route('/admin/blog')
                    })
                }}
              >
                Publish
              </button>
            </>
          ) : (
            <button
              onClick={_ => {
                if(title)
                  updateArticle(articleId as string, {
                    title, subtitle, content
                  }).then(()=>{
                    context.actions.route('/admin/blog')
                  })
              }}
            >
              Update
            </button>
          )
        }
      </div>

      <div id="editor">
        <input type="text" id="content-title" placeholder="Title" 
          defaultValue={title} autoComplete="off"
          onChange={({ target })=>{
            setTitle(target.value)
          }}
        />

        <input type="text" id="content-subtitle" placeholder="Subtitle" 
          defaultValue={subtitle} autoComplete="off"
          onChange={({ target })=>{
            setSubtitle(target.value)
          }}
        />

        <div id="content-holder">
          {
            intent === 'edit' ? (
              !loading ? (
                <RichText readonly={false} 
                  content={content}
                  onSave={()=>{
                    updateArticle(articleId as string, {
                      title, subtitle, content
                    })
                  }}
                  onChange={(value)=>{
                    setcontent(value)
                  }}
                />
              ) : null
            ) : (
              <RichText readonly={false} 
                onSave={()=>{
                  updateArticle(articleId as string, {
                    title, subtitle, content
                  })
                }}
                onChange={(value)=>{
                  setcontent(value)
                }}
              />
            )
          }
        </div>
      </div>
    </section>
  )
}