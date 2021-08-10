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
                      date
                      excerpt
                      slug
                      title
                      author {
                        name
                        picture {
                          url(imgixParams: {w: "400"})
                        }
                      }
                      seoSettings {
                        image {
                          url
                        }
                      }
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
                url: `${process.env.HOSTNAME}${pathPrefix}/${node.slug}`,
                custom_elements: [
                  {'author:avatar': node.author.picture.url},
                  {'site:color': process.env.PRIMARY_COLOR},
                  {'post:image': node.seoSettings.image.url}
                ]
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
        theme_color: `#${process.env.PRIMARY_COLOR}`,
        icon_options: {
          purpose: `any maskable`
        }
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
