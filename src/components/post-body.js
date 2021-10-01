import React from "react";
import { Link } from 'gatsby';
import Image from "gatsby-image";
import { appendKeyToValidElement, renderRule, StructuredText } from "react-datocms"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import ReactPlayer from 'react-player/youtube'
import CopyCode from "./copyCode";
import { vs as inlineStyle, xonokai as codeBlockStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'
import "@fontsource/iosevka"

const justify = {
  textAlign: 'justify'
}

const renderCodeBlock = renderRule(
  (node) => {
    return node.type === 'code'
  },
  ({ node, key }) => {
    return appendKeyToValidElement(
      <div className="font-code">
        <CopyCode>
          <SyntaxHighlighter
            showLineNumbers={true}
            style={{
              ...codeBlockStyle,
              'pre[class*="language-"]': {
                ...codeBlockStyle['pre[class*="language-"]'],
                fontFamily: "Iosevka Extended,Consolas,Courier,monospace"
              },
              'code[class*="language-"]': {
                ...codeBlockStyle['code[class*="language-"]'],
                fontFamily: "Iosevka Extended,Consolas,Courier,monospace"
              }
            }}
            language={node.language}
            children={node.code}
            customStyle={{
              borderRadius: 4,
              border: 0,
              paddingRight: '3.5em',
              fontFamily: 'Iosevka,Consolas,Courier,monospace'
            }}
          />
        </CopyCode>
      </div>
      ,
      key
    )
  }
)

const renderInlineCode = renderRule(
  (node) => {
    return node.type === 'span' && node.marks && node.marks[0] === 'code'
  },
  ({ node, key }) => {
    return appendKeyToValidElement(
      (<SyntaxHighlighter
        PreTag="span"
        CodeTag="span"
        style={{
          ...inlineStyle,
          'pre[class*="language-"]': {
            ...inlineStyle['pre[class*="language-"]'],
            fontFamily: "Iosevka Extended,Consolas,Courier,monospace"
          },
          'code[class*="language-"]': {
            ...inlineStyle['code[class*="language-"]'],
            fontFamily: "Iosevka Extended,Consolas,Courier,monospace"
          }
        }}
        customStyle={{
          padding: "0.15em",
          backgroundColor: '#F5F5F5',
          borderRadius: 4,
          border: 0,
          fontFamily: 'Iosevka Extended,Consolas,Courier,monospace'
        }}
        children={node.value}
      />),
      key
    )
  }
)

const renderImage = (record) => {
  if (record.image.customData.isLink)
    return (
      <Link key={record.originalId} to={record.image.customData.link} title={record.image.customData.linkAlt}>
        <Image fluid={record.image.fluid} className="prose-unprose" />
      </Link>
    )
  else
    return <Image fluid={record.image.fluid} className="prose-unprose" />
}

const renderVideo = (record) => {
  return <div key={record.originalId} className="rounded-sm shadow-md hover:shadow-lg p-0">
    <ReactPlayer
      url={record.video.url}
      width="100%"
      config={{
        youtube: {
          playerVars: { controls: 1 }
        }
      }}
    />
  </div>
}

const renderBlock = ({ record }) => {
  if (record.__typename === "DatoCmsImageBlock")
    return renderImage(record)
  else if (record.__typename === "DatoCmsYoutubeVideo")
    return renderVideo(record)
  return (
    <>
      <p>Upsy woopsy, algo raro pasó aquí xd</p>
      <pre>{JSON.stringify(record, null, 2)}</pre>
    </>
  );
}

export default function PostBody({ content }) {

  console.log(codeBlockStyle)

  return (
    <div className="max-w-2xl mx-auto">
      <div
        className="prose prose-lg prose-blue"
        style={justify}
      >
        <StructuredText
          customRules={[
            renderCodeBlock,
            renderInlineCode
          ]}
          data={content}
          renderBlock={renderBlock}
        />
      </div>
    </div>
  );
}
