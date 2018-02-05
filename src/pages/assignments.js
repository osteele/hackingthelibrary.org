import HeadTitle from '../components/HeadTitle';
import Link from 'gatsby-link'
import React from 'react'
import moment from 'moment'

export default ({ data }) => {
  let posts = data.allMarkdownRemark.edges
    .map(({ node }) => node);

  return <div className="ph2 ph3-ns mw7 center">
    <HeadTitle site={data.site} title="Assignments" description="Assignments, past and future." />
    <article className="page">
      <h1 className="f2 f1-ns mb2 mb3-ns black b">Assignments</h1>
      <p>Current project: <a href="https://docs.google.com/document/d/e/2PACX-1vTn6_M_fUsfHwLONjLmkkCNf22WDgzP77YwUjwcmH5tyq8LUOkM7t5VLo1MP3GDC55ih8uh-JYSanP5/pub">Bear</a></p>
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
