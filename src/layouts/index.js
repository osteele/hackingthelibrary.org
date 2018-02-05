import './css/reset.css'
import './css/tachyons.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'prismjs/themes/prism-twilight.css'
import './main.scss'
import './css/custom.css'
import './css/site.scss'

import Header from '../components/Header'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import config from '../../gatsby-config.js'

const TemplateWrapper = ({ children }) => (
  <div className="sans-serif">
    <Helmet>
      <title>{`${config.siteMetadata.title}`}</title>
      <meta name="description" content={config.siteMetadata.description} />
    </Helmet>
    <Header />
    <main className="page-content">
      <div className="wrapper lh-copy">
        {children()}
      </div>
    </main>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
