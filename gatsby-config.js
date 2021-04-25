require('dotenv').config();

const title = "Fredrare.com"
const pathPrefix = '/posts'

module.exports = {
  siteMetadata: {
    title: title,
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: "gatsby-source-datocms",
      options: {
        apiToken: process.env.DATO_API_TOKEN,
        environment: process.env.DATO_ENVIRONMENT,
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site: allDatoCmsSite(limit: 1) {
              edges {
                node {
                  id
                }
              }
            }
          }
        `,
        feeds: [
          {
            query: `
              {
                posts: allDatoCmsPost {
                  edges {
                    node {
                      slug
                      title
                      excerpt
                      author {
                        name
                      }
                      date
                    }
                  }
                }
              }
            `,
            serialize: function({query: { posts }}) {
              console.log(JSON.stringify(posts))
              return posts.edges.map(({ node }) => ({
                description: node.excerpt.trim(),
                author: node.author.name.trim(),
                date: node.date.trim(),
                title: node.title.trim(),
                url: `${process.env.HOSTNAME}${pathPrefix}/${node.slug}`
              }))
            },
            title: title,
            output: 'feed.rss',
          }
        ]
      }
    },
    "gatsby-plugin-sharp",
    "gatsby-plugin-react-helmet",
  ],
};
