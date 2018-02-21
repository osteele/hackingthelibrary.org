module.exports = {
  siteMetadata: {
    title: 'Hacking the Library',
    subtitle: 'Olin College of Engineering',
    description: 'Let’s create a new kind of Library.',
    currentProjectDescription: 'Idea Harvester',
    // eslint-disable-next-line max-len
    currentProjectUrl: 'https://docs.google.com/document/d/e/2PACX-1vSfrxVt9pepIYY1hbSr8P7mbzhpFuO-gzDMuK-tp1h-cIQw20EfRsjTULlAT706kree1f2WFYodiMRu/pub',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-plugin-sharp',
          'gatsby-remark-prismjs',
          'gatsby-remark-smartypants',
          'gatsby-remark-katex',
          {
            resolve: 'gatsby-remark-images',
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
      resolve: 'gatsby-plugin-favicon',
      options: {
        logo: './src/img/Hacking-L.png',
        icons: {},
      },
    },
    'gatsby-plugin-sass',
    'gatsby-plugin-netlify-cms',
    'gatsby-plugin-nprogress',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-netlify', // Make sure to put last in the array
  ],
};
