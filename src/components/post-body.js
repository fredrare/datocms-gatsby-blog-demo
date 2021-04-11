import React from "react";
import Image from "gatsby-image";
import { appendKeyToValidElement, renderRule, StructuredText } from "react-datocms";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {xonokai as style} from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function PostBody({ content }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue">
        <StructuredText
          customRules={[
            renderRule(
              (node) => {
                return node.type === 'code'
              },
              ({ node, key }) => {
                return appendKeyToValidElement(
                  (<SyntaxHighlighter style={style} language={node.language} children={node.code} />),
                  key
                )
              }
            )
          ]}
          data={ content }
          renderBlock={({ record }) => {
            if (record.__typename === "DatoCmsImageBlock") {
              return <Image fluid={record.image.fluid} />;
            }
            return (
              <>
                <p>Don't know how to render a block!</p>
                <pre>{JSON.stringify(record, null, 2)}</pre>
              </>
            );
          }}
        />
      </div>
    </div>
  );
}
