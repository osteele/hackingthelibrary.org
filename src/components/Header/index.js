import Link from 'gatsby-link'
import React from 'react'
import config from '../../../gatsby-config.js'

const Header = () => (
  <header className="mw8 center pa2 pa3-ns">
    <nav className="">
      <h1 className="lh-solid f5 f4-ns">
        <a className="link dim black b dib mr3" href="/" title="Home">{config.siteMetadata.title}<br /> Olin College Engineering</a>
      </h1>
      <div className="">
        <a className="link dim f6 dib mr3" href="/">Home</a>
        <a className="link dim f6 dib mr3" href="/policies">Policies</a>
        <a className="link dim f6 dib mr3" href="/calendar">Calendar</a>
        <a className="link dim f6 dib mr3" href="/colophon">Colophon</a>
      </div>
    </nav>
  </header>
)

export default Header
