import HeadTitle from '../components/HeadTitle';
import Link from 'gatsby-link';
import React from 'react';
import moment from 'moment';

export default ({ data }) => {
  const posts = data.allMarkdownRemark.edges
    .map(({ node }) => node);

  return <div className="ph2 ph3-ns mw7 center">
    <HeadTitle site={data.site} title="Handouts" description="Class handouts, many of which are actually Google docs." />
    <article className="page">
      <h1 className="f2 f1-ns mb2 mb3-ns black b">Handouts</h1>
      {posts.map(({ frontmatter: fm, id, excerpt }) =>
        <section key={id}>
          <h3>
            <Link to={fm.path}>
              {moment(fm.date).utc().format('ddd, M/D')} — {fm.title}
            </Link>
          </h3>
          <p dangerouslySetInnerHTML={{ __html: fm.description || excerpt }} />
        </section>)}
    </article>
  </div>;
};

export const handoutsQuery = graphql`
query handoutsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {fields: {collection: {eq: "handouts"}}}) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            date
            description
            path
            title
          }
        }
      }
    }
  }
`;
