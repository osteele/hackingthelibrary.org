import './css/reset.css'
import './css/tachyons.css'
import './main.scss'
import './css/custom.css'

import Header from '../components/Header'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import React from 'react'
import config from '../../gatsby-config.js'

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet>
      <title>{`${config.siteMetadata.title}`}</title>
      <meta name="description" content={config.siteMetadata.description} />
    </Helmet>
    <Header />
    <div className="sans-serif page-content">
      <div className="wrapper lh-copy">
        {children()}
      </div>
    </div>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default TemplateWrapper
