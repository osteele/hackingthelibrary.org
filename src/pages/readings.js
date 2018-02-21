import Link from 'gatsby-link';
import React from 'react';
import moment from 'moment';
import HeadTitle from '../components/HeadTitle';
import readings from '../../data/readings.yaml';

const HandoutsPage = ({ data }) => {
  const posts = data.allMarkdownRemark.edges
    .map(({ node }) => node);

  return (
    <div className="ph2 ph3-ns mw7 center">
      <HeadTitle
        site={data.site}
        title="Readings"
        description="Class readings."
      />
      <article className="page">
        <h1 className="f2 f1-ns mb2 mb3-ns black b">Readings</h1>
        {posts.map(({ frontmatter: fm, id, excerpt }) => (
          <section key={id}>
            <h3>
              <Link to={fm.path}>
                {fm.title}
              </Link>
            </h3>
            <p dangerouslySetInnerHTML={{ __html: fm.description || excerpt }} />
          </section>
        ))}
        <h2>On the Web</h2>
        {readings.map(({title, url, author}, i) => (
          <h3 key={i}>
            <a href={url}>
              {title}
            </a>
            {author && <span>, {author}</span>}
          </h3>
        ))}
      </article>
    </div>
  );
};

export default HandoutsPage;

export const readingsQuery = graphql`
query readingsQuery {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: {order: DESC, fields: [frontmatter___date]},
      filter: {fields: {collection: {eq: "readings"}}}
    ) {
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
