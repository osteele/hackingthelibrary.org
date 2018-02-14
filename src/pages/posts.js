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

  // Adapted from http://tachyons.io/components/article-lists/title-preview-author-media-flipped/index.html
  return (
    <section className="mw7 center">
      <HeadTitle site={data.site} title="Articles" description={description} />
      <h2 className="f2 f1-ns mb2 mb3-ns black b">Articles</h2>
      <p className="f7 i mb1">{description}</p>
      <p className="f7 i mb3">
        Also see these same articles <Link to="/topics">organized by topic</Link>.
      </p>
      {posts.map(({ frontmatter: fm, id, excerpt }) => (
        <article key={id} className="pv4 bt bb b--black-10 ph3 ph0-l">
          <Link className="link black db" to={fm.path}>
            <div className="flex flex-column flex-row-ns">
              <div className="w-100 w-60-ns pr3-ns order-2 order-1-ns">
                <h2 key={id} className="f3 athelas mt0 lh-title link blue underline-hover">
                  {fm.title}
                </h2>
                <p className="f6 lh-copy athelas"
                  dangerouslySetInnerHTML={{ __html: fm.description || excerpt }} />
                <p className="f7 lh-copy gray mt2">
                  <span className="f7 ttu">Published: </span>
                  <time className="f6 gray">
                    {moment(fm.date).utc().format('dddd, MMM Do')}
                  </time>
                </p>
                {fm.topics &&
                  <p className="f7 lh-copy gray mv0">
                    <span className="f7 ttu">Topics: </span>
                    {fm.topics.sort().join(', ')}
                  </p>}
              </div>
              <Thumbnail thumbnail={fm.thumbnail} />
            </div>
          </Link>
        </article>))}
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

export const postsQuery = graphql`
query postsQuery {
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
