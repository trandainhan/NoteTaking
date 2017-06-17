import React from 'react'
import classNames from 'classnames'

export default ({children, className}) => (
  <div className={classNames('list', className)}>
    {children}
  </div>
)
