import { isCode } from "datocms-structured-text-utils"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import React, { useRef, useState, useEffect } from "react"
import { appendKeyToValidElement, renderNodeRule, StructuredText } from "react-datocms"
import ReactPlayer from "react-player/youtube"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { xonokai as codeBlockStyle } from "react-syntax-highlighter/dist/esm/styles/prism"
import CopyCode from "./copyCode"
import { WindowControls } from "./icons"

const justify = {
  textAlign: "justify",
}

const renderCodeBlock = renderNodeRule(isCode, ({ node, key }) => {
  const filename = node.code
    .match(/^§ ?(.+?) ?§/g)?.[0]
    .replaceAll("§", "")
    .trim()
  if (filename) node.code = node.code.split("\n").slice(1).join("\n")
  return appendKeyToValidElement(
    <div className="font-code">
      <SyntaxHighlighter
        showLineNumbers={true}
        style={{
          ...codeBlockStyle,
          'pre[class*="language-"]': {
            ...codeBlockStyle['pre[class*="language-"]'],
          },
          'code[class*="language-"]': {
            ...codeBlockStyle['code[class*="language-"]'],
            fontFamily: "Iosevka Extended,JuliaMono,Consolas,Courier,monospace",
            fontVariantLigatures: "normal discretionary-ligatures historical-ligatures",
            fontVariantNumeric: "slashed-zero",
          },
        }}
        language={node.language}
        children={node.code}
        className="rounded-lg"
        customStyle={{
          border: 0,
          paddingRight: "3.5em",
        }}
        PreTag={({ children }) => {
          const [open, setOpen] = useState(true)
          const [height, setHeight] = useState(0)
          const codeRef = useRef()
          useEffect(() => {
            setHeight(codeRef?.current?.offsetHeight)
          }, [])
          return (
            <pre className="rounded-lg border-white shadow-solid-md flex flex-col p-0 overflow-hidden">
              <button
                className="relative h-max bg-slate-700 p-4 w-full flex flex-row justify-between"
                onClick={() => setOpen(!open)}
                title={open ? "Clic para minimizar" : "Clic para maximizar"}
              >
                <span className="absolute left-0 p-4 inset-y-0">
                  <WindowControls />
                </span>

                <p className="text-xs flex items-center h-max m-auto">
                  {open ? node.language + (filename ? " - " + filename : "") : "Clic para mostrar"}
                </p>
              </button>
              <section
                className="transition-[max-height] duration-200 ease-in-out"
                style={{
                  maxHeight: open ? height + "px" : 0,
                }}
              >
                <CopyCode>
                  <div className="p-4 overflow-scroll" ref={codeRef}>
                    {children}
                  </div>
                </CopyCode>
              </section>
            </pre>
          )
        }}
      />
    </div>,
    key
  )
})

const renderInlineCode = renderNodeRule(
  node => {
    return node.type === "span" && node.marks && node.marks[0] === "code"
  },
  ({ node, key }) => {
    return appendKeyToValidElement(
      <span
        className="inline-code rounded bg-slate-200 text-slate-800 px-2 py-1 font-monoligatures slashed-zero"
        style={{
          fontVariantLigatures: ["normal", "discretionary-ligatures", "historical-ligatures"],
          wordWrap: "break-word",
        }}
      >
        {node.value}
      </span>,
      key
    )
  }
)

const renderImage = record => {
  const imageElement = (
    <GatsbyImage
      image={getImage(record.image)}
      alt={record.image.alt}
      title={record.image.title}
      className="prose-unprose rounded-lg overflow-none"
    />
  )
  if (record.image.customData.isLink)
    return (
      <Link
        key={record.originalId}
        to={record.image.customData.link}
        title={record.image.customData.linkAlt}
      >
        {imageElement}
      </Link>
    )
  return imageElement
}

const renderVideo = record => {
  return (
    <div key={record.originalId} className="rounded-sm shadow-md hover:shadow-lg p-0">
      <ReactPlayer
        url={record.video.url}
        width="100%"
        config={{
          youtube: {
            playerVars: { controls: 1 },
          },
        }}
      />
    </div>
  )
}

const renderBlock = ({ record }) => {
  if (record.__typename === "DatoCmsImageBlock") return renderImage(record)
  else if (record.__typename === "DatoCmsYoutubeVideo") return renderVideo(record)
  return (
    <>
      <p>Upsy woopsy, algo raro pasó aquí xd</p>
      <pre>{JSON.stringify(record, null, 2)}</pre>
    </>
  )
}

export default function PostBody({ content }) {
  return (
    <div className="prose prose-lg prose-blue max-w-2xl mx-auto tracking-wide" style={justify}>
      <StructuredText
        customRules={[renderCodeBlock, renderInlineCode]}
        data={content}
        renderBlock={renderBlock}
      />
    </div>
  )
}
