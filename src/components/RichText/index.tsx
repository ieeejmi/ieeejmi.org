import React from 'react'
import Editor from 'rich-markdown-editor'
import { theme } from 'rich-markdown-editor'
import { upload } from '../../services/imgService'

import './RichText.scss'

interface TextEditorProps {
  readonly: boolean
  content?: string
  onChange?: (value:string) => void
  onSave?: () => void
}

export const RichText: React.FC<TextEditorProps> = ({ readonly, content, onChange, onSave }) => {
  if(!readonly)
    return (
      <Editor readOnly={readonly} theme={{
          ...theme,
          background: 'transparent',
          placeholder: '#888',
          fontFamily: 'Roboto Mono'
        }}
        headingsOffset={1}
        defaultValue={content}
        onChange={(v)=>{
          if(onChange)
            onChange(v())
        }}
        onSave={onSave}
        uploadImage={file => {
          console.log("File upload triggered: ", file);
          return upload(file, {
            type: file.type, size: file.size
          })
        }}
        autoFocus
      />
    )
  else if(readonly)
    return (
      <Editor readOnly={readonly} theme={{
          ...theme,
          background: 'transparent',
          placeholder: '#888',
          fontFamily: 'Roboto Mono'
        }}
        headingsOffset={1}
        defaultValue={content}
        onChange={()=>{}}
        autoFocus
      />
    )
  else
    return <div>Invalid Props</div>
}
