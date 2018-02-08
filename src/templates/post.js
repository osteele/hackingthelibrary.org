import HeadTitle from '../components/HeadTitle';
import Img from 'gatsby-image';
import React from 'react';

export default ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter: fm, html, excerpt } = markdownRemark;

  return (
    <article className="page">
      <HeadTitle site={data.site} title={fm.title} description={fm.description || excerpt} />

      <div className=" mw7 center ph2 ph3-ns">
        <h1 className="f2 f1-ns mb2 mb3-ns black b">
          {fm.title}
        </h1>
      </div>

      <section className="mw7 center cf ph2 ph3-ns mb5-ns mb3">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </section>
    </article>
  );
};

export const postQuery = graphql`
  query postQuery($path: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt
      frontmatter {
        path
        title
        description
      }
    }
  }
`;
