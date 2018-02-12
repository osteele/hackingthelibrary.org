const path = require('path');

const { createFilePath } = require(`gatsby-source-filesystem`);
const moment = require('moment');

const baseAbsolutePath = path.join(__dirname, 'src', 'pages');

exports.createPages = async ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const pageTemplate = path.resolve(`src/templates/page.js`);
  const collectionTemplates = {
    'posts': path.resolve(`src/templates/post.js`),
  };
  const query = graphql(nodeQuery);
  const result = await query;

  if (result.errors) {
    console.error(result.errors);
    return Promise.reject(result.errors);
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const { path } = node.frontmatter;
    const relativePath = node.fileAbsolutePath.slice(baseAbsolutePath.length);
    const collection = getPathCollection(relativePath);
    const component = collectionTemplates[collection] || pageTemplate;
    createPage({
      path,
      component,
      context: {}, // Additional data can be passed via context
    });
  });
};

exports.onCreateNode = ({ node, boundActionCreators, getNode }) => {
  const { createNodeField } = boundActionCreators;
  const { internal, frontmatter: fm } = node;

  if (internal.type === `MarkdownRemark`) {
    const relativePath = createFilePath({ node, getNode, basePath: `pages` });
    const collection = getPathCollection(relativePath);
    if (collection === 'posts') {
      const m = path.basename(relativePath).match(/^(\d{4}-\d{2}-\d{2})-(.+)/);
      if (m) {
        const date = moment(m[1]).format('YYYY-MM-DDTHH:mm:ss.SSS') + 'Z';
        const title = titleize(m[2]);
        if (!fm.date) fm.date = m[1];
        if (!fm.title) fm.title = m[2];
      }
    }
    // This needs to come after the previous block, since this block relies on
    /// the frontmatter date that that block may have set.
    if (!fm.path) {
      fm.path = collection === 'posts'
        ? replaceLastComponent(relativePath,
          `${moment(fm.date).format('YYYY/MM/DD')}/${slugify(fm.title)}`)
        : collection === 'handouts'
          ? replaceLastComponent(relativePath,
            `${moment(fm.date).utc().format('YYYY-MM-DD')}-${slugify(fm.title)}`)
          : relativePath;
    }
    createNodeField({ node, name: `collection`, value: collection });
    createNodeField({ node, name: `slug`, value: fm.path });
  }
};

const capitalize = s =>
  s.length > 0 ? s.slice(0, 1).toUpperCase() + s.slice(1) : s;

const titleize = s =>
  capitalize(s).replace(/-./g, s => ' ' + s.slice(1).toUpperCase());

const getPathCollection = relativePath => {
  const m = relativePath.match(/\/(.+?)\/[^\/]/);
  return m && m[1];
}

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
        fileAbsolutePath
        frontmatter {
          path
        }
      }
    }
  }
}
`;
