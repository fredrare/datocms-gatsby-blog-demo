import React, { useState, createRef } from 'react'

export default function CopyCode ({ svg, children }) {
  const [ copyShown, setCopyShown ] = useState(false)
  if (!svg) {
    svg = <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
      viewBox="0 0 488.3 488.3" fill="#EC4899">
      <g>
        <g>
          <path d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124
            C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124
            c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"/>
          <path d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227
            c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6
            V38.6C439.65,17.3,422.35,0,401.05,0z"/>
        </g>
      </g>
    </svg>
  }
  const contentRef = createRef()
  function copy () {
    if (!contentRef.current) return
    const content = contentRef.current.textContent.split('\n').map(x => x.substring(1)).join('\n')
    navigator.clipboard.writeText(content)
  }

  return <div className="relative" onMouseOver={() => setCopyShown(true)} onMouseOut={() => setCopyShown(false)}>
    <div ref={contentRef}>
      {children}
    </div>
    <div
      className={`${copyShown ? '' : 'hidden '}absolute w-5 right-4 top-4 cursor-pointer opacity-70 hover:opacity-100 transform duration-300 rotate-0 hover:rotate-360`}
      onClick={copy}>
      {svg}
    </div>
  </div>
}