import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Footer from "./footer";
import Menu from "./global-menu";

export default function Container({ children, seo, favicon, lang, socialMedia }) {
  const containerStyle = {
    minHeight: '100%'
  }
  return (
    <div className="h-screen flex-col">
      <Menu className="mb-4"/>
      <div className="flex-grow container mx-auto px-5" style={containerStyle}>
        <HelmetDatoCms seo={seo} favicon={favicon} htmlAttributes={lang} />
        {children}
      </div>
      <Footer socialMedia={socialMedia}/>
    </div>
  )
}
