import Helmet from 'react-helmet';
import React from 'react';

export default ({ site, title, description }) =>
  site && site.siteMetadata &&
    <Helmet>
        {title &&
            <title>{`${site.siteMetadata.title} • ${title}`}</title>}
        {description &&
            <meta name="description" content={description} />}
    </Helmet>;
