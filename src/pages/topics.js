import HeadTitle from '../components/HeadTitle';
import Link from 'gatsby-link';
import React from 'react';
import moment from 'moment';

export default ({ data }) => {
    let posts = data.allMarkdownRemark.edges
        .map(({ node }) => node);
    if (process.env.NODE_ENV === 'production') {
        posts = posts.filter(node => !node.frontmatter.draft);
    }

    const topics = {};
    posts.forEach(post =>
        (post.frontmatter.topics || []).forEach(topic => {
            const topicPosts = topics[topic] = topics[topic] || [];
            topicPosts.push(post);
        })
    );

    return (
        <section className="mw7 center">
            <HeadTitle site={data.site} title="Topics" description={description} />
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

const Thumbnail = ({ thumbnail }) =>
    thumbnail &&
    <div className="pl3-ns order-1 order-2-ns mb4 mb0-ns w-100 w-40-ns">
        <img className="db w-50" src={thumbnail.childImageSharp.resolutions.src} />
    </div>;

// This doesn't work on Netlify:
// <Img className="db w-50" resolutions={thumbnail.childImageSharp.resolutions} />

const description = `These notes introduce software engineerng practices, and
demonstrates their application to the example projects. They model steps you may
want to take with your own projects, depending on your learning goals and
practice areas. These notes are meant to inform you of the existence of topics,
not as comprehensive guides to them. Follow the links, research them further,
and/or ask me or the ninjas about them in class, by Slack, or during office
hours.`;

export const topicsQuery = graphql`
query topicsQuery {
  site {
    siteMetadata {
      title
    }
  }
  allMarkdownRemark(sort: {order: DESC, fields: [frontmatter___date]}, filter: {fields: {collection: {eq: "posts"}}}) {
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
          thumbnail {
            childImageSharp {
              resolutions(width: 250) {
                ...GatsbyImageSharpResolutions_noBase64
              }
            }
          }
        }
      }
    }
  }
}
`;
