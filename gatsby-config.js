require(`dotenv`).config();

const title = `Fredrare.com`
const pathPrefix = `/posts`

module.exports = {
  siteMetadata: {
    title: title,
  },
  plugins: [
    {
      resolve: `gatsby-source-datocms`,
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
              return posts.edges.map(({ node }) => ({
                description: node.excerpt,
                author: node.author.name,
                date: node.date,
                title: node.title,
                url: `${process.env.HOSTNAME}${pathPrefix}/${node.slug}`
              }))
            },
            title: title,
            output: `feed.rss`,
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        background_color: `#FFF`,
        cache_busting_mode: `none`,
        display: `standalone`,
        icon: `src/images/anti.png`,
        name: `Fredrare.com`,
        short_name: `Fredrare`,
        start_url: `/`,
        theme_color: `#EC4899`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`],
      }
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
  ],
};
