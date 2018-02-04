import Helmet from 'react-helmet'
import React from "react";

export default ({ data }) => {
  const { markdownRemark } = data; // data.markdownRemark holds our post data
  const { frontmatter: fm, html, excerpt } = markdownRemark;

  return (
    <article className="page">
      <Helmet>
        <meta name="description" content={fm.description || excerpt} />
      </Helmet>

      {fm.google_doc == null &&
        <div className=" mw7 center ph2 ph3-ns">
          <h1 className="f2 f1-ns mb2 mb3-ns black b">
            {fm.title}
          </h1>
        </div>}

      {fm.thumbnail &&
        <figure className="w5 fr">
          <img src={`/assets/images/${fm.thumbnail.path}`} />
          {fm.thumbnail.source_url
            && <figcaption className="i">
              Image source: <a href={fm.thumbnail.source_url}>{fm.thumbnail.source || fm.thumbnail.source_url}</a>
            </figcaption>}
        </figure>}

      <section className="mw7 center cf ph2 ph3-ns mb5-ns mb3">
        <div dangerouslySetInnerHTML={{ __html: html }} />

        {fm.google_doc
          && <a href={fm.embed_doc}>View in Google Docs</a>}
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
        thumbnail { path source source_url }
      }
    }
  }
`;
