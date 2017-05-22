import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import axios from 'axios'

export default class Preact extends React.Component {
  static async getInitialProps () {
    const resp = await axios.get('https://api.github.com/repos/developit/preact')
    const data = resp.data
    return { stars: data.stargazers_count }
  }
  render () {
    return (
      <div>
        <p>Preact.js has {this.props.stars} ⭐️</p>
        <Link prefetch href='/'><a>How about NextJS?</a></Link>
        <Link prefetch href='/about'><a>About</a></Link>
      </div>
    )
  }
}
