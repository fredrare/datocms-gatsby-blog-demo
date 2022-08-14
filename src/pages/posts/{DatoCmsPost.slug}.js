import React from "react";
import { graphql } from "gatsby";
import Container from "../../components/container";
import MoreStories from "../../components/more-stories";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";

export default function Post({ data: { post, morePosts } }) {
  const lang = {
    lang:
      post?.seo?.tags?.find(x => x?.attributes?.property === "og:locale")?.attributes?.content ||
      "es",
  };
  const target = React.createRef();
  return (
    <Container seo={post.seo} lang={lang} target={target}>
      <article className="py-4 mt-4" ref={target}>
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
    </Container>
  );
}

export const query = graphql`
  query PostBySlug($id: String) {
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
              alt
              title
              customData
              gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, imgixParams: { maxW: 760 })
            }
          }
          ... on DatoCmsYoutubeVideo {
            id: originalId
            video {
              url
              title
            }
          }
        }
      }
      date
      coverImage {
        gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, imgixParams: { maxW: 1500 })
      }
      author {
        name
        picture {
          gatsbyImageData(
            width: 50
            placeholder: BLURRED
            imgixParams: { fm: "webp", sat: -50 }
            layout: FIXED
          )
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
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, imgixParams: { maxW: 760 })
        }
        author {
          name
          picture {
            gatsbyImageData(
              width: 50
              placeholder: BLURRED
              imgixParams: { fm: "webp", sat: -50 }
              layout: FIXED
            )
          }
        }
      }
    }
  }
`;
