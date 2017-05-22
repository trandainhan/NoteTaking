import React, { Component } from 'react'

export default class SplitView extends Component {
  render() {
    const {children, className } = this.props
    if (children.length === 0) {
      return null
    }
    const leftChild = children[0]
    const rightChild = children[1]
    const clazzName = 'split-view ' + className
    return (
      <div className={clazzName}>
        {
          leftChild &&
          <div style={styles.leftView}>
            {leftChild}
          </div>
        }
        {
          rightChild &&
          <div style={styles.rightView}>
            {rightChild}
          </div>
        }
      </div>
    )
  }
}

const styles = {
  leftView: {
    width: '50%',
    float: 'left'
  },
  rightView: {
    width: '50%',
    float: 'left'
  }
}
