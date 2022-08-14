import React from "react";
import { StaticQuery, graphql } from "gatsby";
import { HelmetDatoCms } from "gatsby-source-datocms";
import Footer from "./footer";
import Menu from "./global-menu";
import ReadingProgress from "./reading-progress-bar";

export default function Container({ children, seo, lang, target }) {
  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          site: datoCmsSite {
            favicon: faviconMetaTags {
              ...GatsbyDatoCmsFaviconMetaTags
            }
          }
          blog: datoCmsBlog {
            seo: seoMetaTags {
              ...GatsbyDatoCmsSeoMetaTags
            }
            discordImage {
              title
              alt
              customData
              image: gatsbyImageData(
                width: 50
                placeholder: BLURRED
                imgixParams: { fm: "png" }
                layout: FIXED
              )
            }
            rssImage {
              title
              alt
              customData
              image: gatsbyImageData(
                width: 50
                placeholder: BLURRED
                imgixParams: { fm: "png" }
                layout: FIXED
              )
            }
            twitchImage {
              title
              alt
              customData
              image: gatsbyImageData(
                width: 50
                placeholder: BLURRED
                imgixParams: { fm: "png" }
                layout: FIXED
              )
            }
            youtubeImage {
              title
              alt
              customData
              image: gatsbyImageData(
                width: 50
                placeholder: BLURRED
                imgixParams: { fm: "png" }
                layout: FIXED
              )
            }
          }
        }
      `}
      render={({ site: { favicon }, blog }) => {
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
            <Footer
              socialMedia={[blog.twitchImage, blog.discordImage, blog.youtubeImage, blog.rssImage]}
            />
          </div>
        );
      }}
    />
  );
}
