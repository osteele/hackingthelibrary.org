module.exports = {
  siteMetadata: {
    title: 'Hacking the Library',
    subtitle: 'Olin College of Engineering',
    description: 'Let’s create a new kind of Library.',
    current_project: 'https://docs.google.com/document/d/e/2PACX-1vTn6_M_fUsfHwLONjLmkkCNf22WDgzP77YwUjwcmH5tyq8LUOkM7t5VLo1MP3GDC55ih8uh-JYSanP5/pub',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          `gatsby-plugin-sharp`,
          `gatsby-remark-prismjs`,
          `gatsby-remark-smartypants`,
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
              linkImagesToOriginal: true,
            },
          },
        ],
        options: {
          dashes: 'oldschool',
        },
      },
    },
    {
      resolve: `gatsby-plugin-favicon`,
      options: {
        logo: './src/img/Hacking-L.png',
        icons: {},
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-plugin-netlify-cms`,
    `gatsby-plugin-nprogress`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-netlify`, // Make sure to put last in the array
  ],
};
