import React from "react";
import { Link } from 'gatsby';
import Image from "gatsby-image";
import { appendKeyToValidElement, renderRule, StructuredText } from "react-datocms";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { vs as inlineStyle, xonokai as codeBlockStyle } from 'react-syntax-highlighter/dist/esm/styles/prism'

const renderCodeBlock = renderRule(
  (node) => {
    return node.type === 'code'
  },
  ({ node, key }) => {
    return appendKeyToValidElement(
      (
      <SyntaxHighlighter 
        showLineNumbers={true}
        style={codeBlockStyle} 
        language={node.language} 
        children={node.code} 
      />),
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
          style={inlineStyle}
          customStyle={{padding: "0.15em"}}
          children={node.value}
        />),
      key
    )
  }
)

const renderBlock = ({ record }) => {
  if (record.__typename === "DatoCmsImageBlock") {
    if (record.image.customData.isLink)
      return (
        <Link to={record.image.customData.link} title={record.image.customData.linkAlt}>
            <Image fluid={record.image.fluid} />
        </Link>
      )
    else
      return <Image fluid={record.image.fluid} />
  }
  return (
    <>
      <p>Don't know how to render a block!</p>
      <pre>{JSON.stringify(record, null, 2)}</pre>
    </>
  );
}

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue">
        <StructuredText
          customRules={[
            renderCodeBlock,
            renderInlineCode
          ]}
          data={ content }
          renderBlock={ renderBlock }
        />
      </div>
    </div>
  );
}
