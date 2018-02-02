import Link from 'gatsby-link'
import React from 'react'
import moment from 'moment'

export default ({ data }) => {
    let posts = data.allMarkdownRemark.edges
        .map(({ node }) => node)
        .filter(({ frontmatter: { path } }) => path.match(/\/posts\/./))

    return <div className="ph2 ph3-ns mw8 center">
        <article className="page">
            <h1 className="f2 f1-ns mb2 mb3-ns black b">Posts</h1>
            {posts.map(({ frontmatter: fm, id, excerpt }) =>
                <div key={id}>
                    <Link to={fm.path}>
                        {moment(fm.date).utc().format('dddd, MMM Do')}
                    </Link>
                    <div dangerouslySetInnerHTML={{ __html: excerpt }} />
                </div>)}
        </article>
    </div>
}

export const postsQuery = graphql`
query postsQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        id
        excerpt
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
