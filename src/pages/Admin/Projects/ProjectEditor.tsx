import React, { useContext, useState } from 'react'
import { RichText } from '../../../components/RichText'
import { Context } from '../../../ContextProvider'
import { Project, getProjectById, publishProject, saveDraftProject, updateProject } from '../../../services/projectService'

interface ProjectEditorProps {
  intent: 'create' | 'edit'
  projectId?: string
}

export const ProjectEditor: React.FC<ProjectEditorProps> = ({ intent, projectId }) => {
  const [title, setTitle] = useState<string>(String())
  const [description, setDescription] = useState<string>(String())
  const [content, setcontent] = useState<string>(String())

  const [loading, setloading] = useState(true)

  const context = useContext(Context)

  return (
    <section id="admin-project-editor">
      <div className="admin-section-title">
        <h1 className="section-title regular">Project Editor</h1>

        {
          intent === 'create' ? (
            <>
              <button className="outline"
                onClick={_ => {
                  // if(title)
                  //   saveDraftArticle({
                  //     title, subtitle, content
                  //   }).then(()=>{
                  //     context.actions.route('/admin/blog')
                  //   })
                }}
              >
                Save Draft
              </button>
              
              <button
                onClick={_ => {
                  // if(title)
                  //   publishArticle({
                  //     title, subtitle, content
                  //   }).then(()=>{
                  //     context.actions.route('/admin/blog')
                  //   })
                }}
              >
                Publish
              </button>
            </>
          ) : (
            <button
              onClick={_ => {
                // if(title)
                //   updateArticle(articleId as string, {
                //     title, subtitle, content
                //   }).then(()=>{
                //     context.actions.route('/admin/blog')
                //   })
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

        <input type="text" id="content-description" placeholder="Description" 
          defaultValue={description} autoComplete="off"
          onChange={({ target })=>{
            setDescription(target.value)
          }}
        />

        <div id="content-holder">
          {/* {
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
          } */}
        </div>
      </div>
    </section>
  )
}