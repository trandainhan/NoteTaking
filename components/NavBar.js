import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import { getCookie, setCookie } from '../utils/CookieUtils'

class NavBar extends Component {
  constructor (props) {
    super(props)
    this.state = { username: '' , showDropDown: false}
    this.logout = e => this._logout()
    this.showDropDown = e => this._showDropDown()
  }
  _logout () {
    setCookie('username', '')
    setCookie('x-access-token', '')
    setCookie('userId', '')
    Router.push({
      pathname: '/login'
    })
  }
  _showDropDown () {
    this.setState({
      showDropDown: !this.state.showDropDown
    })
  }
  componentDidMount () {
    this.setState({
      username: getCookie('username')
    })
  }
  render () {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link prefetch href='/'>
              <a className="navbar-brand">NoteTaking</a>
            </Link>
          </div>

          <div className="navbar-collapse collapse">
            <ul className="nav navbar-nav">
            </ul>

            <ul className="nav navbar-nav navbar-right">
              <li className="dropdown">
                <a
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {
                    this.state.username
                    ? <div onClick={this.showDropDown}>
                        Hello {this.state.username}
                        <span className="caret"></span>
                      </div>
                    : <Link href="/login"><p>Login</p></Link>
                  }
                </a>
                {
                  this.state.showDropDown &&
                  <ul className="dropdown-menu displayBlock">
                    <li><a href="#" onClick={this.logout}>Logout</a></li>
                  </ul>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default NavBar
