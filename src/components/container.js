import React from "react";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Footer from "./footer";
import Menu from "./global-menu";
import ReadingProgress from "./reading-progress-bar";

export default function Container({ children, seo, favicon, lang, socialMedia, target }) {
  return (
    <div
      className={`${
        !target ? "h-full" : "min-h-full"
      } flex-col pt-10 selection:text-white selection:bg-main bg-slate-50`}
    >
      {target && <ReadingProgress target={target} />}
      <Menu />
      <div className="flex-grow mx-auto px-5 mt-20 min-h-full">
        <HelmetDatoCms seo={seo} favicon={favicon} htmlAttributes={lang} />
        {children}
      </div>
      <Footer socialMedia={socialMedia} />
    </div>
  );
}
