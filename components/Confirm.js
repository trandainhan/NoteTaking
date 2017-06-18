import React, { Component } from 'react'
import Modal from './Modal'

class Confirm extends Component {
  constructor (props) {
    super(props)
    this.confirm = () => this._confirm()
    this.abort = () => this._abort()
  }
  _abort () {
    return this.reject()
  }
  _confirm () {
    return this.resolve()
  }
  componentDidMount () {
    this.promise = new Promise((resolve, reject) => {
      this.resolve = resolve
      this.reject = reject
    })
  }
  render () {
    return (
      <Modal show={true} onClose={this.abort} onSave={this.confirm} title={this.props.title} />
    )
  }
}

export default Confirm
