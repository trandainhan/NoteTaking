import React from 'react'

export default ({children, className, leftWidth, rightWidth}) => {
  if (children.length === 0) {
    return null
  }
  const leftChild = children[0]
  const rightChild = children[1]
  const clazzName = 'split-view ' + className
  const leftViewStyle = leftWidth ? {
    ...styles.leftView,
    width: leftWidth
  } : styles.leftView
  const rightViewStyle = rightWidth ? {
    ...styles.rightView,
    width: rightWidth
  } : styles.rightView
  return (
    <div className={clazzName}>
      {
        leftChild &&
        <div style={leftViewStyle}>
          {leftChild}
        </div>
      }
      {
        rightChild &&
        <div style={rightViewStyle}>
          {rightChild}
        </div>
      }
    </div>
  )
}


const styles = {
  leftView: {
    width: '50%',
    float: 'left',
    borderRight: 'solid 1px black',
    minWidth: '250px'
  },
  rightView: {
    width: '50%',
    float: 'left',
    paddingLeft: '10px'
  }
}
