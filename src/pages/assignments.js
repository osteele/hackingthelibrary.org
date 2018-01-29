import Link from "gatsby-link";
import React from "react";
import graphql from "graphql";

export default ({ data }) => {
    // TODO filter in the graphql query
    const posts = data.allMarkdownRemark.edges
        .map(({ node }) => node)
        .filter((post) => post.frontmatter.category === 'assignment')

    return (
        <div className="ph2 ph3-ns mw8 center">
            <h1 className="f2 f1-ns mb2 mb3-ns black b">Assignments</h1>
            <p>The day one assignment is <Link to="/assignments/day-1/">here</Link>.</p>
            <p>Project One is <a href="https://docs.google.com/document/d/1mSKBAWpNFAy87jFA40eiX5ZLgKFt6nnwd4vUFF2t53M/edit#heading=h.4gstgyfur1e8">here</a>.</p>
            <p>Remaining assignments are listed on the <a href="https://docs.google.com/document/d/19pcGJxmgfgK94Zx4M9XRpXx5TRRrSdE3JCSCRFLCJ8Q/edit#">course syllabus</a>.</p>
        </div>
    );
}

export const pageQuery = graphql`
  query AssignmentsQuery {
    allMarkdownRemark(sort: {order: ASC, fields: [frontmatter___title] }) {
        edges {
            node {
                id
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
