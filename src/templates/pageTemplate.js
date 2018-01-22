import React from "react";

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
    const { markdownRemark } = data; // data.markdownRemark holds our post data
    const { frontmatter, html } = markdownRemark;
    return (
        <article className="page">
            <div className="ph2 ph3-ns mw8 center">
                <h1 className="f2 f1-ns mb2 mb3-ns black b">{frontmatter.title}</h1>
            </div>

            <section className="cf mw8 center ph2 ph3-ns mb5-ns mb3"
                dangerouslySetInnerHTML={{ __html: html }}
            />
        </article>
    );
}

export const pageQuery = graphql`
  query PageByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        path
        title
      }
    }
  }
`;
