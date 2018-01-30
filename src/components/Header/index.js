import Link from 'gatsby-link'
import React from 'react'
import config from '../../../gatsby-config.js'

const links = [
  ["Assignments", '/assignments/'],
  ["Activity", '/activities/day-1'],
  // ["Policies", '/policies'],
  ["Calendar", '/calendar'],
  // ["Syllabus", 'https://docs.google.com/document/d/e/2PACX-1vT2lvYP2J2pLV4b2Ncvrl_EYhCot4kgobowZ7FS3qcDG17cuOHVi1MauSJs-xd9sxbw8wECEsidBHFV/pub'],
  // https://docs.google.com/document/d/19pcGJxmgfgK94Zx4M9XRpXx5TRRrSdE3JCSCRFLCJ8Q/edit?usp=drive_web&ouid=114980762230857786249
  ["Lecture Notes", '/lecture-notes'],
  ["Syllabus", '/syllabus'],
  ["Colophon", '/colophon'],
]

const Header = () => (
  <header className="mw8 center pa2 pa3-ns">
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

export default Header
