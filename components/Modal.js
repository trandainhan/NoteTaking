import React, { Component } from 'react'
import { uniqueId } from 'lodash/fp'
import Button from './Button'

const isHeader = (ele) => {return ele.type.displayName === 'Header'}
const isBody = (ele) => {return ele.type.displayName === 'Body'}
const isFooter = (ele) => {return ele.type.displayName === 'Footer'}

const renderModalChildren = (children, type, props) => {
  if (!children) return null
  const childrens = !children.length ? [children] : children
  const result = []
  childrens.forEach((ele) => {
    if (type(ele)) {
      result.push(<ele.type key={uniqueId('modalChild_')} {...ele.props} {...props} />)
    }
  })
  return result
}

class Modal extends Component {
  constructor (props) {
    super(props)
    this.state = { show: this.props.show || false }
    this.handleClose = (e) => this._handleClose()
    this.handleSave = (e) => this._handleSave()
    this.renderHeader = () => this._renderHeader()
    this.renderBody = () => this._renderBody()
    this.renderFooter = () => this._renderFooter()
  }
  _handleClose() {
    this.setState({
      show: false
    })
    this.props.onClose()
  }
  _handleSave () {
    this.setState({
      show: false
    })
    this.props.onSave()
  }
  componentWillReceiveProps (nextProps) {
    this.setState({
      show: nextProps.show
    })
  }
  _renderHeader () {
    return this._renderChild(isHeader, {
      onClose: this.handleClose
    })
  }
  _renderBody () {
    return this._renderChild(isBody)
  }
  _renderFooter () {
    return this._renderChild(isFooter, {
      onClose: this.handleClose,
      onSave: this.handleSave
    })
  }
  _renderChild (type, additionProps) {
    return renderModalChildren(this.props.children, type, additionProps)
  }
  render () {
    if (!this.state.show) return null;
    return (
      <div>
        <div className="modal show" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              {this.renderHeader()}
              {this.renderBody()}
              {this.renderFooter()}
            </div>
          </div>
        </div>
        <div className='modal-backdrop in' />;
      </div>

    )
  }
}

export const Header = ({onClose, title, children}) => (
  <div className="modal-header">
    <Button
      className='close'
      aria-label='Close'
      onClick={onClose}
    >
      <span aria-hidden="true">&times;</span>
    </Button>
    <h4 className="modal-title">{title}</h4>
    {children}
  </div>
)


export const Body = ({children}) => (
  <div className="modal-body">
    {children}
  </div>
)

export const Footer = ({onClose, onSave, children}) => (
  <div className="modal-footer">
    <Button onClick={onClose}>Close</Button>
    <Button onClick={onSave}>Save changes</Button>
    {children}
  </div>
)

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal
