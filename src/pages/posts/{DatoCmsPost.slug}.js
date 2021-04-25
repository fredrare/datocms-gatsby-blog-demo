import React from "react";
import { graphql } from "gatsby";
import Container from "../../components/container";
import Header from "../../components/header";
import MoreStories from "../../components/more-stories";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import Footer from "../../components/footer";
import SectionSeparator from "../../components/section-separator";
import { HelmetDatoCms } from "gatsby-source-datocms";

export default function Post({ data: { blog, site, post, morePosts } }) {
  const lang = {
    lang: 'es'
  }
  return (
    <Container>
      <HelmetDatoCms seo={post.seo} favicon={site.favicon}  htmlAttributes={lang} />
      <Header />
      <article>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
      </article>
      <SectionSeparator />
      {morePosts.nodes.length > 0 && <MoreStories posts={morePosts.nodes} />}
      <Footer socialMedia={[blog.twitchImage, blog.discordImage, blog.youtubeImage, blog.rssImage]} />
    </Container>
  );
}

export const query = graphql`
  query PostBySlug($id: String) {
    site: datoCmsSite {
      favicon: faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    blog: datoCmsBlog {
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
    post: datoCmsPost(id: { eq: $id }) {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      content {
        value
        blocks {
          __typename
          ... on DatoCmsImageBlock {
            id: originalId
            image {
              customData
              fluid(
                imgixParams: { fm: "jpg" }
                sizes: "(max-width: 700) 100vw, 700px"
              ) {
                ...GatsbyDatoCmsFluid
              }
            }
          }
        }
      }
      date
      coverImage {
        fluid(
          imgixParams: { fm: "jpg" }
          sizes: "(max-width: 1500px) 100vw, 1500px"
        ) {
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
    morePosts: allDatoCmsPost(
      sort: { fields: date, order: DESC }
      limit: 2
      filter: { id: { ne: $id } }
    ) {
      nodes {
        title
        slug
        excerpt
        date
        coverImage {
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
