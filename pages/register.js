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

class NewNoteBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      passwordErrorMsg: '',
      userErrorMsg: ''
    }
    this.changeUsername = e => this._changeUsername(e.target.value)
    this.changePassword = e => this._changePassword(e.target.value)
    this.changeConfirmPassword = e => this._changeConfirmPassword(e.target.value)
    this.handleKeyPress = e => this._handleKeyPress(e.key)
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
  _handleKeyPress (key) {
    if (key === 'Enter') {
      this._register()
    }
  }
  async _register () {
    this._resetErrorMessage()
    const { username, password, confirmPassword } = this.state
    if (password !== confirmPassword) {
      this._setPasswordErrorMessage('Password must be the same.')
      return
    }
    if (!username || !password) return
    this.setState({
      isLoading: true
    })
    try {
      const res = await fetch.post('/user/register', this.state)
      if (res.data.success) {
        Router.push({
          pathname: '/login'
        })
      }
    } catch (error) {
      this._setUserErrorMessage(error.response.data.message)
      this.setState({
        isLoading: false
      })
    }
  }
  _setPasswordErrorMessage(msg) {
    this.setState({
      passwordErrorMsg: msg
    })
  }
  _setUserErrorMessage(msg) {
    this.setState({
      userErrorMsg: msg
    })
  }
  _resetErrorMessage () {
    this.setState({
      passwordErrorMsg: '',
      userErrorMsg: ''
    })
  }
  render () {
    const {
      username,
      password,
      confirmPassword,
      isLoading,
      passwordErrorMsg,
      userErrorMsg
    } = this.state
    const registable = username && password && confirmPassword
    return (
      <Loader loaded={!isLoading}>
        <div style={styles.login}>
          <Header />
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <ValidateInput
              required
              type="text"
              value={username}
              onChange={this.changeUsername}
              errorMessage={userErrorMsg}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <ValidateInput
              required
              type="password"
              value={password}
              onChange={this.changePassword}
              errorMessage={passwordErrorMsg}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Confirm Password:</label>
            <ValidateInput
              required
              type="password"
              value={confirmPassword}
              onChange={this.changeConfirmPassword}
              onKeyPress={this.handleKeyPress}
              errorMessage={passwordErrorMsg}
            />
          </div>
          <Button
            style={styles.button}
            onClick={this.register}
            type={Button.TYPE.PRIMARY}
            size={Button.SIZE.LARGE}
            disabled={!registable}
          >
            Register
          </Button>
          <Link prefetch href='/login'>
            <Button style={styles.button}>Login</Button>
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
