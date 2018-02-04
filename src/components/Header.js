import Link from 'gatsby-link'
import React from 'react'
import config from '../../gatsby-config.js'
import { links } from '../../data/header-links.js'

export default () => (
  <header className="mw7 center pa2 pa3-ns">
    <nav className="">
      <h1 className="lh-solid f5 f4-ns">
        <Link className="link dim black b dib mr3" to="/" title="Home">
          {config.siteMetadata.title}<br />
          {config.siteMetadata.subtitle}</Link>
      </h1>
      <div className="">
        <Link className="link dim f6 dib mr3" to="/">Home</Link>
        {links.map(([name, url], i) =>
          url.match(/^https?:/)
            ? <a key={i} href={url} className="link dim f6 dib mr3">{name}</a>
            : <Link key={i} className="link dim f6 dib mr3" to={url}>{name}</Link>)}
      </div>
    </nav>
  </header>
)
