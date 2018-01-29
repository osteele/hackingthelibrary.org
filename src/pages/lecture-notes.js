import Link from "gatsby-link";
import React from "react";
import graphql from "graphql";

export default ({ data }) => {
    // TODO filter in the graphql query
    const posts = data.allMarkdownRemark.edges
        .map(({ node }) => node)
        .filter((post) => post.frontmatter.category === 'lecture-note')

    return (
        <ul className="ph2 ph3-ns mw8 center">
            <h1 className="f2 f1-ns mb2 mb3-ns black b">Lecture Notes</h1>
            <ul>
                {posts
                    .map(({ frontmatter: fm }) =>
                        <li><a href={fm.path}>Day {fm.day}</a></li>)}
            </ul>
        </ul>
    );
}

export const pageQuery = graphql`
  query IndexQuery {
                    allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___day] }) {
                    edges {
                node {
                    id
          frontmatter {
                    category
            day
                path
          }
        }
      }
    }
  }
`;
