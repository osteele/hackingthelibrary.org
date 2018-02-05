import Link from 'gatsby-link'
import React from 'react'
import moment from 'moment'

export default ({ data }) => {
  const now = moment().startOf('day');
  let assignments = data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .filter(({ frontmatter: fm }) => moment(fm.date).utc().endOf('day').isAfter(now));

  return <div className="ph2 ph3-ns mw8 mt3 center">
    <article className="page center mw7">
      <img className="fl w-30 pt2 pr3" src={data.deadlineImage.responsiveSizes.src} />
      <div className="fl w-70">
        {assignments.map(({ frontmatter: fm, id, html }) =>
          <div key={id} className="ba mb4">
            <section className="ph3-ns mb5-ns ma0">
              <h1 className="f1-ns mb3-ns ma0">
                {moment(fm.date).add(12, 'hours').format('ddd M/D')}
              </h1>
              <div dangerouslySetInnerHTML={{ __html: html }} />
            </section>
          </div>)}
      </div>
    </article>
  </div>
}


export const indexPageQuery = graphql`
query indexPageQuery {
  deadlineImage: imageSharp(id: { regex: "/time-481444_1920/" }) {
    responsiveSizes {
      aspectRatio
      base64
      src
      srcSet
      sizes
    }
  }
  allMarkdownRemark(sort: {order: ASC, fields: [frontmatter___date]}, filter: {fields: {collection: {eq: "assignments"}}}) {
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
