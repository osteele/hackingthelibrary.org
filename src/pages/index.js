import React from 'react';
import moment from 'moment';

const now = moment().startOf('day');

const IndexPage = ({ data }) => {
  const assignments = data.allMarkdownRemark.edges.map(({ node }) => node).filter(({ frontmatter: fm }) =>
    moment(fm.date)
      .utc()
      .endOf('day')
      .isAfter(now));

  return (
    <div className="ph2 ph3-ns mw9 mt3 center">
      <article className="page center mw7">
        <div className="fl w-50" dangerouslySetInnerHTML={{ __html: data.projectDashboard.html }} />
        <div className="fl w-50">
          {assignments.map(({ frontmatter: fm, id, html }) => (
            <div key={id} className="ba mb4">
              <section className="ph3-ns mb5-ns ma0">
                <h1 className="f1-ns mb3-ns ma0">
                  {moment(fm.date)
                    .utc()
                    .format('ddd, MMM Do')}
                </h1>
                <div dangerouslySetInnerHTML={{ __html: html }} />
              </section>
            </div>
          ))}
        </div>
      </article>
    </div>
  );
};

export default IndexPage;

export const indexPageQuery = graphql`
  query indexPageQuery {
    projectDashboard: markdownRemark(frontmatter: { home_module: { eq: 1 } }) {
      html
    }
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { fields: { collection: { eq: "assignments" } } }
    ) {
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
