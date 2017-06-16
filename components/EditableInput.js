import React, { Component } from 'react'
import classNames from 'classnames'

class EditableInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isEdit: false
    }
    this.handleEdit = () => this._handleEdit()
    this.handleDone = () => this._handleDone()
    this.handleChange = (e) => this.props.onChange(e.target.value)
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
  render () {
    const { isEdit } = this.state
    const { value, style = {} } = this.props
    if (isEdit) {
      return (
        <div style={style}>
          <input
            style={styles.inputValue}
            className='form-control'
            value={value}
            onChange={this.handleChange}
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
        <div style={style}>
          <span style={styles.spanValue} >{value}</span>
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
    width: '80%',
    display: 'inline-block',
    marginRight: '10px'
  },
  spanValue: {
    fontSize: '20px',
    marginRight: '10px'
  },
  okIcon: {
    cursor: 'pointer',
    marginTop: '5px'
  },
  editIcon: {
    cursor: 'pointer',
    marginTop: '5px'
  }
}

export default EditableInput
