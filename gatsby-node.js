const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);
const moment = require('moment');

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const pageTemplate = path.resolve(`src/templates/pageTemplate.js`);
  const query = graphql(nodeQuery);
  const result = await query;

  if (result.errors) {
    console.error(result.errors);
    return Promise.reject(result.errors);
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const path = node.frontmatter.path;
    createPage({
      path,
      component: pageTemplate,
      context: {}, // Additional data can be passed via context
    });
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  const { internal, frontmatter: fm } = node;

  if (internal.type === `MarkdownRemark`) {
    const relativePath = createFilePath({ node, getNode, basePath: `pages` });
    const collection = relativePath.split('/').length > 3 ? relativePath.split('/')[1] : null;
    if (!fm.path) {
      fm.path = collection === 'posts'
        ? replaceLastComponent(relativePath,
          `${moment(fm.date).format('YYYY/MM/DD')}/${slugify(fm.title)}`)
        : collection === 'handouts'
          ? replaceLastComponent(relativePath,
            `${moment(fm.date).format('MM-DD')}-${slugify(fm.title)}`)
          : relativePath;
    }
    createNodeField({ node, name: `collection`, value: collection });
    createNodeField({ node, name: `slug`, value: fm.path });
  }
};

const slugify = s =>
  s.replace(/[^a-z0-9]+/gi, '-').toLowerCase();

const replaceLastComponent = (path, slug) => {
  const components = path.split('/');
  let index = components.length - 1;
  if (components[index] === '') {
    index -= 1;
  }
  components[index] = slug;
  return components.join('/');
};

const nodeQuery = `
{
  allMarkdownRemark(
    sort: { order: DESC, fields: [] }
    limit: 1000
  ) {
    edges {
      node {
        frontmatter {
          path
          author
          description
          draft
          google_doc
          embed_doc
        }
      }
    }
  }
}
`;
