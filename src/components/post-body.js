import "@fontsource/iosevka";
import { isCode } from "datocms-structured-text-utils";
import { Link } from "gatsby";
import Image from "gatsby-image";
import React, { useState } from "react";
import { appendKeyToValidElement, renderNodeRule, StructuredText } from "react-datocms";
import ReactPlayer from "react-player/youtube";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  vs as inlineStyle,
  xonokai as codeBlockStyle,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import CopyCode from "./copyCode";

const justify = {
  textAlign: "justify",
};

const renderCodeBlock = renderNodeRule(isCode, ({ node, key }) => {
  const filename = node.code.match(/^\§ ?(.+?) ?\§/g);
  if (filename) node.code = node.code.split("\n").slice(1).join("\n");
  console.log(filename);
  return appendKeyToValidElement(
    <div className="font-code">
      <SyntaxHighlighter
        showLineNumbers={true}
        style={{
          ...codeBlockStyle,
          'pre[class*="language-"]': {
            ...codeBlockStyle['pre[class*="language-"]'],
            fontFamily: "Iosevka Extended,Consolas,Courier,monospace",
          },
          'code[class*="language-"]': {
            ...codeBlockStyle['code[class*="language-"]'],
            fontFamily: "Iosevka Extended,Consolas,Courier,monospace",
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
          const [open, setOpen] = useState(true);
          return (
            <pre className="rounded-lg border-white shadow-solid-md flex flex-col p-0 overflow-hidden">
              <button
                className="h-max bg-slate-700 p-4 w-full flex flex-row justify-between"
                onClick={() => setOpen(!open)}
                title={open ? "Clic para minimizar" : "Clic para maximizar"}
              >
                <div className="flex flex-row gap-2 w-min group">
                  <div className="w-max aspect-square rounded-full border-min border-red-500/90">
                    <div className="flex flex-col w-3 h-3 rounded-full bg-red-500 border-2 border-red-500 items-center justify-center">
                      <div className="w-full h-1px translate-y-1/2 rotate-45 bg-red-500 group-hover:bg-red-900 "></div>
                      <div className="w-full h-1px -translate-y-1/2 -rotate-45 bg-red-500 group-hover:bg-red-900 "></div>
                    </div>
                  </div>

                  <div className="w-max aspect-square rounded-full border-min border-yellow-500/90">
                    <div className="flex flex-col w-3 h-3 rounded-full bg-yellow-500 border-2 border-yellow-500 items-center justify-center">
                      <div className="w-full h-1px bg-yellow-500 group-hover:bg-yellow-900 "></div>
                    </div>
                  </div>
                  <div className="w-max aspect-square rounded-full border-min border-green-500/90">
                    <div className="flex flex-col w-3 h-3 rounded-full bg-green-500 border-2 border-green-500 items-center justify-center">
                      <div className="w-full h-full bg-green-500 group-hover:bg-green-900 flex items-center scale-75">
                        <div className="w-full h-0.5 bg-green-500 -rotate-45 scale-150 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-xs flex items-center h-max m-auto">
                  {open
                    ? node.language +
                      (filename ? " - " + filename[0].replaceAll("§", "").trim() : "")
                    : "Clic para mostrar"}
                </p>
              </button>
              {open && (
                <CopyCode>
                  <div className="p-4 overflow-scroll">{children}</div>
                </CopyCode>
              )}
            </pre>
          );
        }}
      />
    </div>,
    key
  );
});

const renderInlineCode = renderNodeRule(
  node => {
    return node.type === "span" && node.marks && node.marks[0] === "code";
  },
  ({ node, key }) => {
    return appendKeyToValidElement(
      <SyntaxHighlighter
        PreTag="span"
        CodeTag="span"
        style={{
          ...inlineStyle,
          'pre[class*="language-"]': {
            ...inlineStyle['pre[class*="language-"]'],
            fontFamily: "Iosevka Extended,Consolas,Courier,monospace",
          },
          'code[class*="language-"]': {
            ...inlineStyle['code[class*="language-"]'],
            fontFamily: "Iosevka Extended,Consolas,Courier,monospace",
          },
        }}
        customStyle={{
          padding: "0.15rem 0.4rem",
          backgroundColor: "#E2E8F0",
          borderRadius: 4,
          border: 0,
        }}
        children={node.value}
      />,
      key
    );
  }
);

const renderImage = record => {
  if (record.image.customData.isLink)
    return (
      <Link
        key={record.originalId}
        to={record.image.customData.link}
        title={record.image.customData.linkAlt}
      >
        <Image fluid={record.image.fluid} className="prose-unprose rounded-lg overflow-none" />
      </Link>
    );
  else
    return <Image fluid={record.image.fluid} className="prose-unprose rounded-lg overflow-none" />;
};

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
  );
};

const renderBlock = ({ record }) => {
  if (record.__typename === "DatoCmsImageBlock") return renderImage(record);
  else if (record.__typename === "DatoCmsYoutubeVideo") return renderVideo(record);
  return (
    <>
      <p>Upsy woopsy, algo raro pasó aquí xd</p>
      <pre>{JSON.stringify(record, null, 2)}</pre>
    </>
  );
};

export default function PostBody({ content }) {
  console.log(codeBlockStyle);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="prose prose-lg prose-blue" style={justify}>
        <StructuredText
          customRules={[renderCodeBlock, renderInlineCode]}
          data={content}
          renderBlock={renderBlock}
        />
      </div>
    </div>
  );
}
