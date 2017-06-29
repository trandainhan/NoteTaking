import React, { Component } from 'react'
import classNames from 'classnames'
import { omit } from 'lodash/fp'

class Button extends Component {
  render () {
    const { className, type = 'btn-default', size} = this.props
    const clazzName = classNames('btn', type, size, className)
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
  DEFAULT: 'btn-default',
  PRIMARY: 'btn-primary',
  INFO: 'btn-info',
  WARNING: 'btn-warning',
  DANGER: 'btn-danger'
}

Button.SIZE = {
  LARGE: 'btn-lg',
  DEFAULT: '',
  SMALL: 'btn-sm',
  EXTRASMALL: 'btn-xs'
}

export default Button
