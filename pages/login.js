import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import fetch from '../api/Fetch'

import Header from '../components/Header'
import Input from '../components/Input'
import Button from '../components/Button'

class NewNoteBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.changeUsername = e => this._changeUsername(e.target.value)
    this.changePassword = e => this._changePassword(e.target.value)
    this.login = e => this._login()
  }
  _changeUsername (value) {
    this.setState({
      username: value
    })
  }
  _changePassword (value) {
    this.setState({
      password: value
    })
  }
  async _login () {
    const { username, password } = this.state
    if (!username || !password) return
    const res = await fetch.post('/authenticate', this.state)
    if (res.status === 200) {
      Router.push({
        pathname: '/'
      })
    }
  }
  render () {
    const { username, password } = this.state
    return (
      <div style={styles.login}>
        <Header />
        <div clasName="form-group">
          <label htmlFor="username">Email address:</label>
          <Input type="text" value={username} onChange={this.changeUsername} />
        </div>
        <div clasName="form-group">
          <label htmlFor="pwd">Password:</label>
          <Input type="password" value={password} onChange={this.changePassword} />
        </div>
        <Button style={styles.button} onClick={this.login}>Login</Button>
        <Link prefetch href='/register'><Button style={styles.button} >Register</Button></Link>
      </div>
    )
  }
}

const styles = {
  login: {
    width: '50%',
    margin: 'auto',
    marginTop: '20px'
  },
  button: {
    marginTop: '10px',
    marginRight: '10px'
  }
}

export default NewNoteBook
