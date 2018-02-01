import React from 'react'

export default ({ data }) => {
  const blocks = data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .filter((post) => post.frontmatter.category === 'announcement')

  return <div className="ph2 ph3-ns mw8 center">
    <article className="center mw5 mw6-ns hidden ba mv4">
      {blocks.map(({ frontmatter: fm, id, html }) =>
        <div key={id}>
          <h1 className="f4 bg-near-black white mv0 pv2 ph3">{fm.title}</h1>
          <div className="pa3 bt">
            <div dangerouslySetInnerHTML={{ __html: html }} />
          </div>
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
