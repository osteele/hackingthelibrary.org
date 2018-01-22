module.exports = {
  siteMetadata: {
    title: 'Hacking the Library',
    description: "Let’s create a new kind of Library.",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "markdown-pages",
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sass`,
  ],
};
