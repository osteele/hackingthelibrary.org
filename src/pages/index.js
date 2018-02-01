import React from 'react'

export default ({ data }) => {
  const blocks = data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .filter((post) => post.frontmatter.category === 'lesson-plan')

  return <div className="ph2 ph3-ns mw8 center">
    <article className="page">
      {blocks.map(({ frontmatter: fm, id, html }) =>
        <div key={id}>
          <h1 className="f2 f1-ns mb2 mb3-ns black b">{fm.title}</h1>
          <section className="cf mw8 center ph2 ph3-ns mb5-ns mb3">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </section>
        </div>)
      }
    </article>
  </div >
}

export const homePageBlockQuery = graphql`
  query LectureNotesQuery {
        allMarkdownRemark(sort: {order: ASC, fields: [frontmatter___title] }) {
        edges {
      node {
        id
        html
                frontmatter {
        category
                    path
      title
          }
        }
      }
    }
  }
`;
