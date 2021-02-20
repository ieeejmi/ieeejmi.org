import React, { useEffect, useState } from 'react'

import './Dialog.scss'

interface DialogProps {
  open: boolean
  title: string
  message: string
  options: DialogOptionsProps[]
  canSkip?: boolean
}

interface DialogOptionsProps {
  type: 'main' | 'secondary'
  text: string
  onChoose: () => void
}

export const Dialog: React.FC<DialogProps> = ({ open, title, message, options, canSkip }) => {
  const [isOpen, setisOpen] = useState(open)

  useEffect(() => {
    setisOpen(open)
  }, [open])
  
  if (isOpen)
    return (
      <section className="dialog-shadow">
        <div className="dialog-box">
          <h1>{ title }</h1>
          <p>
            { message }
          </p>

          {
            canSkip ? (
              <span className="dialog-close" onClick={() => setisOpen(false) } >x</span>
            ) : null
          }

          <div className="dialog-options">
            {
              options.map((option)=>(
                <div className="option">
                  <button className={ option.type === 'secondary' ? 'secondary' : '' }
                    onClick={option.onChoose}
                  >
                    { option.text }
                  </button>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    )
  else
   return <span></span>
}
