import HeadTitle from '../components/HeadTitle';
import Link from 'gatsby-link'
import React from 'react'
import moment from 'moment'

export default ({ data }) => {
  let { current_project } = data.site.siteMetadata;
  let posts = data.allMarkdownRemark.edges
    .map(({ node }) => node);

  return <div className="ph2 ph3-ns mw7 center">
    <HeadTitle site={data.site} title="Assignments" description="Assignments, past and future." />
    <article className="page">
      <h1 className="f2 f1-ns mb2 mb3-ns black b">Assignments</h1>
      {current_project &&
        <p>Current project: <a href={current_project}>Bear</a></p>}
      <ul>
        {posts.map(({ frontmatter: fm, id, excerpt }) =>
          <li key={id}>
            <Link to={fm.path}>
              {moment(fm.date).utc().format('dddd, MMM Do')}
            </Link>
          </li>)}
      </ul>
    </article>
  </div>
}

export const assignmentsQuery = graphql`
query assignmentsQuery {
    site {
      siteMetadata {
        title
        current_project
      }
    }
    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {fields: {collection: {eq: "assignments"}}}) {
      edges {
        node {
          id
          frontmatter {
            date
            path
            title
          }
        }
      }
    }
  }
`;
