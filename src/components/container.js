import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Footer from "./footer";
import Menu from "./global-menu";
import ReadingProgress from "./reading-progress-bar";

export default function Container({ children, seo, favicon, lang, socialMedia, target }) {
  const containerStyle = {
    minHeight: '100%'
  }

  return (
    <div
      className={`${!target ? 'h-screen' : ''} flex-col pt-10`}
      style={target && containerStyle}
    >
      {target && <ReadingProgress target={target} />}
      <Menu />
      <div className="flex-grow container mx-auto px-5 mt-20" style={containerStyle}>
        <HelmetDatoCms seo={seo} favicon={favicon} htmlAttributes={lang} />
        {children}
      </div>
      <Footer socialMedia={socialMedia} />
    </div>
  )
}
