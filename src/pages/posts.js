import Link from 'gatsby-link'
import React from 'react'
import moment from 'moment'

export default ({ data }) => {
    let posts = data.allMarkdownRemark.edges
        .map(({ node }) => node)
        .filter(({ frontmatter: { path } }) => path.match(/\/posts\/./))

    // Adapted from http://tachyons.io/components/article-lists/title-preview-author-media-flipped/index.html
    return <section className="mw8 center">
        <h2 className="f2 f1-ns mb2 mb3-ns black b">Posts</h2>
        {posts.map(({ frontmatter: fm, id, excerpt }) =>
            <article className="pv4 bt bb b--black-10 ph3 ph0-l">
                <Link className="link dim black" to={fm.path}>
                    <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                        <h2 key={id} className="f3 athelas mt0 lh-title link underline-hover blue">
                            {fm.title}
                        </h2>
                        <p className="f5 f4-l lh-copy athelas"
                            dangerouslySetInnerHTML={{ __html: fm.description || excerpt }} />
                    </div>
                    <time className="f6 db gray">
                        {moment(fm.date).utc().format('dddd, MMM Do')}
                    </time>
                </Link>
            </article>)}
    </section >
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
          description
          path
          title
        }
      }
    }
  }
}
`;
