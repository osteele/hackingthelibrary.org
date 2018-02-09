import HeadTitle from '../components/HeadTitle';
import Img from 'gatsby-image';
import React from 'react';

export default ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter: fm, html, excerpt } = markdownRemark;

  return (
    <article className="page">
      <HeadTitle site={data.site} title={fm.title} description={fm.description || excerpt} />

      <section className="mw7 center cf ph2 ph3-ns mb5-ns mb3">
        {fm.thumbnail &&
          <div className="dn-s">
            <img className="h4" src={fm.thumbnail.childImageSharp.sizes.src} />
          </div>}

        <h1 className="f2 f1-ns mb2 mb3-ns black b">
          {fm.title}
        </h1>
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
    markdownRemark(frontmatter: {path: {eq: $path } }) {
      html
      excerpt
      frontmatter {
        path
        title
        description
        thumbnail {
          childImageSharp {
            sizes {
              ...GatsbyImageSharpSizes_noBase64
            }
          }
        }
      }
    }
  }
`;
