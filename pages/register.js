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
      password: '',
      confirmPassword: ''
    }
    this.changeUsername = e => this._changeUsername(e.target.value)
    this.changePassword = e => this._changePassword(e.target.value)
    this.changeConfirmPassword = e => this._changeConfirmPassword(e.target.value)
    this.register = e => this._register()
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
  _changeConfirmPassword (value) {
    this.setState({
      confirmPassword: value
    })
  }
  async _register () {
    const { username, password, confirmPassword } = this.state
    if (password !== confirmPassword) return
    if (!username || !password) return
    const res = await fetch.post('/register', this.state)
    if (res.status === 201) {
      Router.push({
        pathname: '/login',
        query: {
          username: username,
          password: password
        }
      })
    }
  }
  render () {
    const { username, password, confirmPassword } = this.state
    return (
      <div style={styles.login}>
        <Header />
        <div className="form-group">
          <label htmlFor="username">Email address:</label>
          <Input type="text" value={username} onChange={this.changeUsername} />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Password:</label>
          <Input type="password" value={password} onChange={this.changePassword} />
        </div>
        <div className="form-group">
          <label htmlFor="pwd">Confirm Password:</label>
          <Input type="password" value={confirmPassword} onChange={this.changeConfirmPassword} />
        </div>
        <Button style={styles.button} onClick={this.register}>Login</Button>
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
    marginTop: '10px'
  }
}

export default NewNoteBook
