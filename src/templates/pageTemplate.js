import Helmet from 'react-helmet'
import React from "react";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter: fm, html, excerpt } = markdownRemark;

  return (
    <article className="page">
      <Helmet>
        <meta name="description" content={fm.description || excerpt} />
      </Helmet>

      {fm.google_doc == null &&
        <div className="ph2 ph3-ns mw8 center">
          <h1 className="f2 f1-ns mb2 mb3-ns black b">
            {fm.title}
          </h1>
        </div>}

      <section className="cf mw8 center ph2 ph3-ns mb5-ns mb3">
        {fm.google_doc
          && <a href={fm.embed_doc}>View in Google Docs</a>}
        <div dangerouslySetInnerHTML={{ __html: html }} />
        {fm.embed_doc && <iframe src={fm.embed_doc}></iframe>}
      </section>
    </article>
  );
}

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      excerpt
      frontmatter {
        path
        title
        description
        google_doc
        embed_doc
      }
    }
  }
`;
