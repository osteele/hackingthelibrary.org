module.exports = {
  siteMetadata: {
    title: 'Hacking the Library',
    subtitle: 'Olin College of Engineering',
    description: "Let’s create a new kind of Library.",
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: "markdown-pages",
      },
    },
    'gatsby-transformer-remark',
    'gatsby-plugin-sass',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-nprogress',
  ],
};
