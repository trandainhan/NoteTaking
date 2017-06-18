import React, { Component } from 'react'
import classNames from 'classnames'
import { omit } from 'lodash/fp'

class Button extends Component {
  render () {
    const { className } = this.props
    const clazzName = classNames('btn', 'btn-primary', className)
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

export default Button
