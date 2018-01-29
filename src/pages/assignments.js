import Link from "gatsby-link";
import React from "react";
import graphql from "graphql";

export default ({ data }) => {
    // TODO filter in the graphql query
    const posts = data.allMarkdownRemark.edges
        .map(({ node }) => node)
        .filter((post) => post.frontmatter.category === 'assignment')

    return (
        <ul className="ph2 ph3-ns mw8 center">
            <h1 className="f2 f1-ns mb2 mb3-ns black b">Assignments</h1>
            <ul>
                {posts
                    .map(({ frontmatter: fm }) =>
                        <li><a href={fm.path}>{fm.title}</a></li>)}
            </ul>
        </ul>
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
