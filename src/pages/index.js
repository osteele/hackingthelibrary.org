import React from 'react';
import moment from 'moment';

const now = moment().startOf('day');

const IndexPage = ({ data }) => {
  const assignments = data.allMarkdownRemark.edges
    .map(({ node }) => node)
    .filter(({ frontmatter: fm }) => moment(fm.date).utc().endOf('day').isAfter(now));

  return (
    <div className="ph2 ph3-ns mw9 mt3 center">
      <article className="page center mw7">
        <div className="fl w-40 pt2 pr3 bg-white">
          <img src={data.deadlineImage.responsiveSizes.src} />
          <blockquote className="athelas ml0 mt0 black-90">
            <p className="f5 f4-m f3-l">
              I love deadlines. I love the whooshing noise they make as they go by.
            </p>
            <cite className="f6 ttu tracked fs-normal">—Douglas Adams</cite>
          </blockquote>
        </div>
        <div className="fl w-60">
          {assignments.map(({ frontmatter: fm, id, html }) => (
            <div key={id} className="ba mb4">
              <section className="ph3-ns mb5-ns ma0">
                <h1 className="f1-ns mb3-ns ma0">
                  {moment(fm.date).utc().format('ddd, MMM Do')}
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
  deadlineImage: imageSharp(id: { regex: "/\/img\/time-481444_1920\\./" }) {
    responsiveSizes {
      aspectRatio
      base64
      src
      srcSet
      sizes
    }
  }
  allMarkdownRemark(
    sort: {order: ASC, fields: [frontmatter___date]},
    filter: {fields: {collection: {eq: "assignments"}}}
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
