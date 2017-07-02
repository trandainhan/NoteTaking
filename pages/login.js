import React, { Component } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import fetch from '../api/Fetch'

import Validator from '../hoc/Validator'

import Header from '../components/Header'
import Input from '../components/Input'
import Button from '../components/Button'
import Loader from '../components/Loader'

const ValidateInput = Validator(Input)

import { setCookie } from '../utils/CookieUtils'

class NewNoteBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      errorMessage: ''
    }
    this.changeUsername = e => this._changeUsername(e.target.value)
    this.changePassword = e => this._changePassword(e.target.value)
    this.handleKeyPress = e => this._handleKeyPress(e.key)
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
  _handleKeyPress (key) {
    if (key === 'Enter') {
      this._login()
    }
  }
  async _login () {
    const { username, password } = this.state
    if (!username || !password) return
    this.setState({
      isLoading: true
    })
    try {
      const res = await fetch.post('/authenticate', this.state)
      if (res.data.success) {
        setCookie('x-access-token', res.data.token)
        setCookie('username', username)
        setCookie('userId', res.data.user._id)
        Router.push({
          pathname: '/'
        })
      }
    } catch (error) {
      this.setState({
        errorMessage: error.response.data.message,
        isLoading: false
      })
    }
  }
  render () {
    const { username, password, isLoading, errorMessage } = this.state
    const loginable = username && password
    return (
      <Loader loaded={!isLoading}>
        <div style={styles.login}>
          <Header />
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <ValidateInput
              type="text"
              value={username}
              onChange={this.changeUsername}
              required
              errorMessage={errorMessage}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <ValidateInput
              type="password"
              value={password}
              onChange={this.changePassword}
              onKeyPress={this.handleKeyPress}
              required
              errorMessage={errorMessage}
            />
          </div>
          <Button
            style={styles.button}
            onClick={this.login}
            type={Button.TYPE.PRIMARY}
            size={Button.SIZE.LARGE}
            disabled={!loginable}
          >
            Login
          </Button>
          <Link prefetch href='/register'>
            <Button style={styles.button} >Register</Button>
          </Link>
        </div>
      </Loader>
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
