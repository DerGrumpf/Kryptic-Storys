require(`dotenv`).config({
  path: `.env`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE

module.exports = {
  siteMetadata: {
    // Used for the title template on pages other than the index site
    siteTitle: `Kryptic Storys`,
    // Default title of the page
    siteTitleAlt: `Kryptic-Storys`,
    // Can be used for e.g. JSONLD
    siteHeadline: `Kryptic Storys`,
    // Will be used to generate absolute URLs for og:image etc.
    siteUrl: `https://krypticstorys.gatsbyjs.io/`,
    // Used for SEO
    siteDescription: `Kryptic Storys, dem Computer Verschlüsselungen beibringen!`,
    // Will be set on the <html /> tag
    siteLanguage: `de`,
    // Used for og:image and must be placed inside the `static` folder
    siteImage: `/banner.jpg`,
    // Twitter Handle
    author: `@dergrumpf`,
  },
  plugins: [
    {
      resolve: `@lekoarts/gatsby-theme-minimal-blog`, 
      // See the theme's README for all available options
      options: {
        navigation: [
          {
            title: `Blog`,
            slug: `/blog`,
          },
          {
            title: `About`,
            slug: `/about`,
          },
        ],
        externalLinks: [
          {
            name: `HBK BS`,
            url: `https://www.hbk-bs.de/`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Kryptic Storys`,
        short_name: `kryptic-storys`,
        description: `Kryptic Storys, dem Computer Verschlüsselungen beibringen!`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#6B46C1`,
        display: `standalone`,
        icons: [
          {
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-plugin-netlify`,
    shouldAnalyseBundle && {
      resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
      options: {
        analyzerMode: `static`,
        reportFilename: `_bundle.html`,
        openAnalyzer: false,
      },
    },
  ].filter(Boolean),
}
