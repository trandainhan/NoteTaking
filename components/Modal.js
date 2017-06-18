import React, { Component } from 'react'
import Button from './Button'

class Modal extends Component {
  constructor (props) {
    super(props)
    this.state = { show: this.props.show || false }
    this.handleClose = (e) => this._handleClose()
    this.handleSave = (e) => this._handleSave()
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
  render () {
    const { children, title } = this.props
    if (!this.state.show) return null;
    return (
      <div>
        <div className="modal show" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <Header onClose={this.handleClose} title={title} />
              <Body></Body>
              <Footer onClose={this.handleClose} onSave={this.handleSave} />
            </div>
          </div>
        </div>
        <div className='modal-backdrop in' />;
      </div>

    )
  }
}

export const Header = ({onClose, title}) => (
  <div className="modal-header">
    <Button
      className='close'
      aria-label='Close'
      onClick={onClose}
    >
      <span aria-hidden="true">&times;</span>
    </Button>
    <h4 className="modal-title">{title}</h4>
  </div>
)


export const Body = ({children}) => (
  <div className="modal-body">
    {children}
  </div>
)

export const Footer = ({onClose, onSave}) => (
  <div className="modal-footer">
    <Button onClick={onClose}>Close</Button>
    <Button onClick={onSave}>Save changes</Button>
  </div>
)

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal
