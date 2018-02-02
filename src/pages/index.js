import Link from 'gatsby-link'
import React from 'react'

export default ({ data }) => {
  const assignments = data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .filter(({ frontmatter: fm }) => fm.path.match(/\/assignments\/./))

  return <div className="ph2 ph3-ns mw8 center">
    <article className="page">
      {assignments.slice(0, 1).map(({ frontmatter: fm, id, html }) =>
        <div key={id}>
          <h1 className="f2 f1-ns mb2 mb3-ns black b">{fm.title}</h1>
          <section className="cf mw8 center ph2 ph3-ns mb5-ns mb3">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </section>
        </div>)}
    </article>
  </div>
}

export const indexPageQuery = graphql`
query indexPageQuery {
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}) {
    edges {
      node {
        id
        html
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
