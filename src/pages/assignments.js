import Link from 'gatsby-link'
import React from 'react'
import moment from 'moment'

export default ({ data }) => {
    let posts = data.allMarkdownRemark.edges
        .map(({ node }) => node);

    return <div className="ph2 ph3-ns mw8 center">
        <article className="page">
            <h1 className="f2 f1-ns mb2 mb3-ns black b">Assignments</h1>
            {posts.map(({ frontmatter: fm, id, excerpt }) =>
                <div key={id}>
                    <Link to={fm.path}>
                        {moment(fm.date).utc().format('dddd, MMM Do')}
                    </Link>
                </div>)}
        </article>
    </div>
}

export const assignmentsQuery = graphql`
query assignmentsQuery {
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
