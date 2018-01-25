import Link from 'gatsby-link'
import React from 'react'
import config from '../../../gatsby-config.js'

const links = [
  ["Assignment", '/assignments/day-1'],
  ["Activity", '/assignments/day-1'],
  // ["Policies", '/policies'],
  ["Calendar", '/calendar'],
  // ["Syllabus", 'https://docs.google.com/document/d/e/2PACX-1vT2lvYP2J2pLV4b2Ncvrl_EYhCot4kgobowZ7FS3qcDG17cuOHVi1MauSJs-xd9sxbw8wECEsidBHFV/pub'],
  // https://docs.google.com/document/d/19pcGJxmgfgK94Zx4M9XRpXx5TRRrSdE3JCSCRFLCJ8Q/edit?usp=drive_web&ouid=114980762230857786249
  ["Syllabus", '/syllabus'],
  ["Colophon", '/colophon'],
]

const Header = () => (
  <header className="mw8 center pa2 pa3-ns">
    <nav className="">
      <h1 className="lh-solid f5 f4-ns">
        <a className="link dim black b dib mr3" href="/" title="Home">
          {config.siteMetadata.title}<br />
          {config.siteMetadata.subtitle}</a>
      </h1>
      <div className="">
        <a className="link dim f6 dib mr3" href="/">Home</a>
        {links.map(([name, url]) =>
          <a className="link dim f6 dib mr3" href={url}>{name}</a>)}
      </div>
    </nav>
  </header>
)

export default Header
