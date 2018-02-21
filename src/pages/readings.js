import Link from 'gatsby-link';
import React from 'react';
import { sortBy } from 'lodash';
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
        <h2>Excerpts</h2>
        <dl>
          {posts.map(({ frontmatter: fm, id, excerpt }) => (
            <section key={id}>
              <dt>
                <Link to={fm.path}>
                  {fm.title}
                </Link>
              </dt>
              <dd dangerouslySetInnerHTML={{ __html: fm.description || excerpt }} />
            </section>
          ))}
          <h2>On the Web</h2>
          {sortBy(readings, 'title').map(({ title, url, author }, i) => (
            <div key={i}>
              <dt>
                <a href={url}>
                  {title}
                </a>
              </dt>
              {author && <dd>{author}</dd>}
            </div>
          ))}
        </dl>
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
      sort: {order: ASC, fields: [frontmatter___title]},
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
