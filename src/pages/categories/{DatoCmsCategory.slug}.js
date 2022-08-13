import React from "react";
import { graphql } from "gatsby";
import Container from "../../components/container";
import MoreStories from "../../components/more-stories";

export default function Category({ data: { category, allPosts, site, blog } }) {
  const lang = {
    lang: "es",
  };
  return (
    <Container
      seo={blog.seo}
      favicon={site.favicon}
      lang={lang}
      socialMedia={[blog.twitchImage, blog.discordImage, blog.youtubeImage, blog.rssImage]}
    >
      <section className="flex-col md:flex-row flex items-center max-w-5xl mx-auto md:justify-between mt-10 mb-16 md:mb-12">
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          {category.name}
        </h2>
        <h4 className="text-center text-lg mt-5 md:pl-8">{category.description}</h4>
      </section>
      <MoreStories posts={allPosts.nodes} title="Publicaciones" />
    </Container>
  );
}

export const query = graphql`
  query CategoryBySlug($id: String) {
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
        fixed(width: 50, imgixParams: { fm: "png" }) {
          ...GatsbyDatoCmsFixed
        }
      }
      rssImage {
        title
        alt
        customData
        fixed(width: 50, imgixParams: { fm: "png" }) {
          ...GatsbyDatoCmsFixed
        }
      }
      twitchImage {
        title
        alt
        customData
        fixed(width: 50, imgixParams: { fm: "png" }) {
          ...GatsbyDatoCmsFixed
        }
      }
      youtubeImage {
        title
        alt
        customData
        fixed(width: 50, imgixParams: { fm: "png" }) {
          ...GatsbyDatoCmsFixed
        }
      }
    }
    category: datoCmsCategory(id: { eq: $id }) {
      id
      name
      description
    }
    allPosts: allDatoCmsPost(
      sort: { fields: date, order: DESC }
      limit: 20
      filter: { category: { id: { eq: $id } } }
    ) {
      nodes {
        title
        slug
        excerpt
        date
        coverImage {
          large: fluid(imgixParams: { fm: "jpg" }, sizes: "(max-width: 1500px) 100vw, 1500px") {
            ...GatsbyDatoCmsFluid
          }
          small: fluid(
            imgixParams: { fm: "jpg" }
            sizes: "(max-width: 760px) 100vw, (max-width: 1500px) 50vw, 700px"
          ) {
            ...GatsbyDatoCmsFluid
          }
        }
        author {
          name
          picture {
            fixed(width: 48, height: 48, imgixParams: { fm: "jpg", fit: "crop", sat: -50 }) {
              ...GatsbyDatoCmsFixed
            }
          }
        }
      }
    }
  }
`;
