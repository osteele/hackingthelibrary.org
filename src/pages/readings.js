import Link from 'gatsby-link';
import React from 'react';
import moment from 'moment';
import HeadTitle from '../components/HeadTitle';

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
        {readings.map(([title, url], i) => (
          <h3 key={i}>
            <Link to={url}>
              {title}
              </Link>
          </h3>
        ))}
      </article>
    </div>
  );
};

const readings = [
  ["The Library Bill of Rights", "http://www.ala.org/advocacy/intfreedom/librarybill"],
  ["Holding a Program in One's Head", "http://paulgraham.com/head.html"],
  ["Aristotle's Classical Unities (Wikipedia summary)", "https://en.wikipedia.org/wiki/Classical_unities"],
  ["UML 2 Deployment Diagrams: An Agile Introduction", "http://www.agilemodeling.com/artifacts/deploymentDiagram.htm"],
  ["Agile Team Organisation: Squads, Chapters, Tribes and Guilds", "http://www.full-stackagile.com/2016/02/14/team-organisation-squads-chapters-tribes-and-guilds/", "Ashley-Christian Hardy"],
  ["Scaling Agile @ Spotify with Tribes, Squads, Chapters & Guilds (PDF)", "https://blog.crisp.se/wp-content/uploads/2012/11/SpotifyScaling.pdf", "Henrik Kniberg & Anders Ivarsson"],
  ]
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
