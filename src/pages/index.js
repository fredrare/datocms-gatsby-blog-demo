import React from "react";
import Container from "../components/container";
import Footer from "../components/footer";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import MoreStories from "../components/more-stories";
import { HelmetDatoCms } from "gatsby-source-datocms";
import { graphql } from "gatsby";

export default function Index({ data: { allPosts, site, blog } }) {
  const heroPost = allPosts.nodes[0];
  const morePosts = allPosts.nodes.slice(1);
  const lang = {
    lang: 'es'
  }
  return (
    <Container>
      <HelmetDatoCms seo={blog.seo} favicon={site.favicon} htmlAttributes={lang} />
      <Intro />
      {heroPost && (
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
      )}
      {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      <Footer socialMedia={[blog.twitchImage, blog.discordImage, blog.youtubeImage, blog.rssImage]}/>
    </Container>
  );
}

export const query = graphql`
  {
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
        fixed(
          width: 50
          imgixParams: { fm: "png" }
        ) {
          ...GatsbyDatoCmsFixed
        }
      }
      rssImage {
        title
        alt
        customData
        fixed(
          width: 50
          imgixParams: { fm: "png" }
        ) {
          ...GatsbyDatoCmsFixed
        }
      }
      twitchImage {
        title
        alt
        customData
        fixed(
          width: 50
          imgixParams: { fm: "png" }
        ) {
          ...GatsbyDatoCmsFixed
        }
      }
      youtubeImage {
        title
        alt
        customData
        fixed(
          width: 50
          imgixParams: { fm: "png" }
        ) {
          ...GatsbyDatoCmsFixed
        }
      }
    }
    allPosts: allDatoCmsPost(sort: { fields: date, order: DESC }, limit: 20) {
      nodes {
        title
        slug
        excerpt
        date
        coverImage {
          large: fluid(imgixParams: { fm: "jpg" }, sizes: "(max-width: 1500px) 100vw, 1500px") {
            ...GatsbyDatoCmsFluid
          }
          small: fluid(imgixParams: { fm: "jpg" }, sizes: "(max-width: 760px) 100vw, (max-width: 1500px) 50vw, 700px") {
            ...GatsbyDatoCmsFluid
          }
        }
        author {
          name
          picture {
            fixed(
              width: 48
              height: 48
              imgixParams: { fm: "jpg", fit: "crop", sat: -50 }
            ) {
              ...GatsbyDatoCmsFixed
            }
          }
        }
      }
    }
  }
`;
