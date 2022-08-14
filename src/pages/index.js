import React from "react";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import MoreStories from "../components/more-stories";
import { graphql } from "gatsby";

export default function Index({ data: { allPosts, blog } }) {
  const heroPost = allPosts.nodes[0];
  const morePosts = allPosts.nodes.slice(1);
  const lang = {
    lang: "es",
  };

  return (
    <Container seo={blog.seo} lang={lang}>
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
    </Container>
  );
}

export const query = graphql`
  {
    blog: datoCmsBlog {
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    allPosts: allDatoCmsPost(sort: { fields: date, order: DESC }, limit: 20) {
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
