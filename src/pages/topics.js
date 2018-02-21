import HeadTitle from '../components/HeadTitle';
import Link from 'gatsby-link';
import React from 'react';

export default ({ data }) => {
  let posts = data.allMarkdownRemark.edges
    .map(({ node }) => node);
  if (process.env.NODE_ENV === 'production') {
    posts = posts.filter(node => !node.frontmatter.draft);
  }

  const topics = {};
  posts.forEach((post) => {
    (post.frontmatter.topics || []).forEach((topic) => {
      // eslint-disable-next-line no-multi-assign
      const topicPosts = topics[topic] = topics[topic] || [];
      topicPosts.push(post);
    });
  });

  return (
        <section className="mw7 center">
            <HeadTitle site={data.site} title="Topics" description={data.description} />
            <h2 className="f2 f1-ns mb2 mb3-ns black b">Topics</h2>
            {Object.keys(topics).sort().map(topic => (
                <section key={topic}>
                    <h3 className="f2 ttu">{topic}</h3>
                    {topics[topic].map(({ frontmatter: fm, id, excerpt }) => (
                        <article key={id} className="pv2 ph0-l">
                            <Link className="link black db" to={fm.path}>
                                <div className="w-100 order-2 order-1-ns">
                                    <h2 key={id} className="f3 athelas mt0 lh-title link blue underline-hover">
                                        {fm.title}
                                    </h2>
                                    <p className="f6 lh-copy athelas"
                                        dangerouslySetInnerHTML={{ __html: fm.description || excerpt }} />
                                </div>
                            </Link>
                        </article>))}
                </section>))}
        </section>
  );
};

export const pageQuery = graphql`
   query topicsQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
        sort: {order: DESC, fields: [frontmatter___date]},
        filter: {fields: {collection: {eq: "posts"}}}
    ) {
      edges {
        node {
          id
          excerpt
          frontmatter {
            date
            description
            draft
            path
            title
            topics
          }
        }
      }
    }
  }
`;
