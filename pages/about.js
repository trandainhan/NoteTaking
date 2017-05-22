import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

export default () => (
  <div>
    <div>Welcome to about. This is Next Project of @trdainhan</div>
    <div><Link prefetch href='/'><a>Home</a></Link></div>
    <div><Link prefetch href='/preact'><a>Preact</a></Link></div>
  </div>
)

Router.onRouteChangeStart = (url) => {
  console.log('App is changing to: ', url)
}
