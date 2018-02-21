import Link from 'gatsby-link';
import React from 'react';
import HeadTitle from '../components/HeadTitle';

const TopicTemplate = ({ pathContext, data }) => {
  const { topic } = pathContext;
  let posts = data.allMarkdownRemark.edges
    .map(({ node }) => node);
  if (process.env.NODE_ENV === 'production') {
    posts = posts.filter(node => !node.frontmatter.draft);
  }

  return (
    <section className="mw7 center">
      <HeadTitle site={data.site} title={topic} description={data.description} />
      <h2 className="f2 f1-ns mb2 mb3-ns black b">{topic}</h2>
      {posts.map(({ frontmatter: fm, id, excerpt }) => (
        <article key={id} className="pv2 ph0-l">
          <Link className="link black db" to={fm.path}>
            <div className="w-100 order-2 order-1-ns">
              <h2 key={id} className="f3 athelas mt0 lh-title link blue underline-hover">
                {fm.title}
              </h2>
              <p className="f6 lh-copy athelas"
                dangerouslySetInnerHTML={{ __html: fm.description || excerpt }} />
            </div>
          </Link>
        </article>))}
    </section>
  );
};

export default TopicTemplate;

export const topicsQuery = graphql`
  query topicQuery($topic: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]},
        filter: {frontmatter: {topics: {in: [$topic]}}}) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            date
            description
            draft
            path
            title
          }
        }
      }
    }
  }
`;
