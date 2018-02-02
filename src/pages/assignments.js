import Link from 'gatsby-link'
import React from 'react'
import moment from 'moment'

export default ({ data }) => {
    let posts = data.allMarkdownRemark.edges
        .map(({ node }) => node)
        .filter(({ frontmatter: fm }) => fm.path.match(/\/assignments\/./))

    return <div className="ph2 ph3-ns mw8 center">
        <article className="page">
            <h1 className="f2 f1-ns mb2 mb3-ns black b">Assignments</h1>
            {posts.map(({ frontmatter: fm, id, excerpt }) =>
                <div key={id}>
                    <Link style={{ boxShadow: 'none' }} to={fm.path}>
                        {moment(fm.date).add(12, 'hours').format('ddd, M/D')}
                    </Link>
                </div>)}
        </article>
    </div>
}

export const assignmentsQuery = graphql`
query assignmentsQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        id
        excerpt
        frontmatter {
          category
          date
          path
          title
        }
      }
    }
  }
}
`;
