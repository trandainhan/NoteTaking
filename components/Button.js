import React, { Component } from 'react'
import classNames from 'classnames'
import { omit } from 'lodash/fp'

class Button extends Component {
  render () {
    const { className, type = 'default' } = this.props
    const clazzName = classNames('btn', `btn-${type}`, className)
    const props = omit(['className'], this.props)
    return (
      <button
        type="button"
        className={clazzName}
        {...props}
      >
        {this.props.children}
      </button>
    )
  }
}

Button.TYPE = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  INFO: 'info',
  WARNING: 'warning',
  DANGER: 'danger'
}

export default Button
