import React, { Component } from 'react'
import classNames from 'classnames'
import Input from './Input'

class EditableInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdit: false
    }
    this.handleEdit = () => this._handleEdit()
    this.handleDone = () => this._handleDone()
    this.handleChange = (e) => this.props.onChange(e.target.value)
    this.handleKeyPress = (e) => this._handleKeyPress(e.key)
  }
  _handleEdit () {
    this.setState({
      isEdit: true
    })
  }
  _handleDone () {
    this.props.onFinishEdit && this.props.onFinishEdit(this.props.value)
    this.setState({
      isEdit: false
    })
  }
  _handleKeyPress (key) {
    if (key === 'Enter') {
      this.props.onFinishEdit && this.props.onFinishEdit(this.props.value)
      this.setState({
        isEdit: false
      })
    }
  }
  render () {
    const { isEdit } = this.state
    const { value, style = {}, textClassName } = this.props
    if (isEdit) {
      return (
        <div className='controlHeight' style={style}>
          <Input
            style={styles.inputValue}
            value={value}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <span
            style={styles.okIcon}
            className='glyphicon glyphicon-ok'
            onClick={this.handleDone}
          />
        </div>
      )
    } else {
      return (
        <div className='controlHeight' style={style}>
          <span
            className={classNames(textClassName)}
            style={styles.spanValue} >
            {value}
          </span>
          <span
            style={styles.editIcon}
            className='glyphicon glyphicon-edit'
            onClick={this.handleEdit}
          />
        </div>
      )
    }
  }
}

const styles = {
  inputValue: {
    width: '90%',
    display: 'inline-block',
    marginRight: '5px'
  },
  spanValue: {
    fontSize: '20px',
    marginRight: '10px'
  },
  okIcon: {
    cursor: 'pointer',
    marginTop: '5px',
    color: '#01a701'
  },
  editIcon: {
    cursor: 'pointer',
    marginTop: '5px',
    color: '#01a701'
  }
}

export default EditableInput
