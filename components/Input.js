import React, { Component } from 'react'
import { omit } from 'lodash/fp'
import classNames from 'classnames'

class Input extends Component {
  render () {
    const { value, onChange, className } = this.props
    const props = omit(['value', 'onChange'], this.props)
    const clazzName = classNames('form-control', className)
    return (
      <input
        className={clazzName}
        value={value}
        onChange={onChange}
        {...props}
      />
    )
  }
}

export default Input
