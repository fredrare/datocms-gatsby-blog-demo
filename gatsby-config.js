require(`dotenv`).config()

const title = `Fredrare.com`
const name = `Fredrare`
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
            serialize: function ({ query: { posts } }) {
              return posts.edges.map(({ node }) => ({
                description: node.excerpt,
                author: node.author.name,
                date: node.date,
                title: node.title,
                url: `${process.env.HOSTNAME}${pathPrefix}/${node.slug}`,
                custom_elements: [
                  { "author:avatar": node.author.picture.url },
                  { "site:color": process.env.PRIMARY_COLOR },
                  { "post:image": node.seoSettings.image.url },
                ],
              }))
            },
            title: name,
            site_url: "https://fredrare.com",
            link: "https://fredrare.com",
            image_url: "https://www.datocms-assets.com/46144/1660453838-anti-logo-loop.gif",
            ttl: 360,
            language: "es",
            output: `feed.rss`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Fredrare`,
        short_name: `Fredrare`,
        start_url: `/`,
        background_color: `#f8fafc`,
        theme_color: `#${process.env.PRIMARY_COLOR}`,
        display: `standalone`,
        cache_busting_mode: `none`,
        icon: `src/images/anti.png`,
        legacy: false, // this will not add apple-touch-icon links to <head>
        include_favicon: false, // This will exclude favicon link tag
        icon_options: {
          purpose: `any maskable`,
        },
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`],
      },
    },
    `gatsby-plugin-postcss`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-image`,
  ],
}
