import React, { Component } from 'react'
import classNames from 'classnames'
import { omit } from 'lodash/fp'

const Validator = (Com) => class ValidateCom extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errorMessage: this.props.errorMessage || ''
    }
    this.handleChange = (e) => this._handleChange(e)
    this.handleKeyPress = (e) => this._handleKeyPress(e)
    this.handleBlur = (e) => this._handleBlur(e)
  }
  _handleChange (e) {
    const { onChange } = this.props
    this._resetErrorMesage()
    onChange && onChange(e)
  }
  _handleKeyPress (e) {
    const { onKeyPress } = this.props
    this._resetErrorMesage()
    onKeyPress && onKeyPress(e)
  }
  _resetErrorMesage () {
    this.state.errorMessage && this.setState({
      errorMessage: ''
    })
  }
  _handleBlur (e) {
    const { onBlur, required } = this.props
    if (required && e.target.value === '') {
      this.setState({
        errorMessage: 'This field is requried.'
      })
    }
    onBlur && onBlur(e)
  }
  componentWillReceiveProps (nextProps) {
    if (this.props.errorMessage !== nextProps.errorMessage) {
      this.setState({
        errorMessage: nextProps.errorMessage
      })
    }
  }
  render () {
    const { errorMessage } = this.state
    const hasError = !!errorMessage
    const clazzName = classNames({'has-error': hasError})
    const componentProps = omit(
      ['onChange', 'onKeyPress', 'onBlur', 'errorMessage'], this.props
    )
    return (
      <div className={clazzName}>
        <Com
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onBlur={this.handleBlur}
          {...componentProps}
        />
      <span style={{color: 'red'}}>{errorMessage}</span>
      </div>
    )
  }
}

export default Validator
