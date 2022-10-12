import React from "react"
import { graphql } from "gatsby"
import Container from "../../components/container"
import MoreStories from "../../components/more-stories"

export default function Category({ data: { category, allPosts } }) {
  const lang = {
    lang: "es",
  }
  return (
    <Container seo={category.seo} lang={lang}>
      <section className="flex-col md:flex-row flex items-center max-w-5xl mx-auto md:justify-between mt-10 mb-16 md:mb-12">
        <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
          {category.name}
        </h2>
        <h4 className="text-center text-lg mt-5 md:pl-8">{category.description}</h4>
      </section>
      <MoreStories posts={allPosts.nodes} title="Publicaciones" />
    </Container>
  )
}

export const query = graphql`
  query CategoryBySlug($id: String) {
    category: datoCmsCategory(id: { eq: $id }) {
      id
      name
      description
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
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
          alt
          title
          gatsbyImageData(placeholder: BLURRED, layout: CONSTRAINED, imgixParams: { maxW: 760 })
        }
        seoSettings {
          title
        }
        author {
          name
          picture {
            alt
            title
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
`
