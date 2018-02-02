import Link from 'gatsby-link'
import React from 'react'
import moment from 'moment'

export default ({ data }) => {
    let posts = data.allMarkdownRemark.edges
        .map(({ node }) => node)
        .filter(({ frontmatter: fm }) => fm.path.match(/\/handouts\//))

    return <div className="ph2 ph3-ns mw8 center">
        <article className="page">
            <h1 className="f2 f1-ns mb2 mb3-ns black b">Handouts</h1>
            {posts.map(({ frontmatter: fm, id }) =>
                <div key={id}>
                    <Link style={{ boxShadow: 'none' }} to={fm.path}>
                        {moment(fm.date).format('ddd, M/D')} — {fm.title}
                    </Link>
                </div>)}
        </article>
    </div>
}

export const handoutsQuery = graphql`
query handoutsQuery {
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
