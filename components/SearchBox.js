import React, { Component } from 'react'
import classNames from 'classnames'
import Input from './Input'

const SearchBox = ({ value, onChange, className }) => (
  <div style={styles.searchBox} className={classNames('search-box', className)}>
    <Input value={value} onChange={onChange} placeholder='search...' />
    <span style={styles.iconSearch} className='glyphicon glyphicon-search' />
  </div>
)

const styles = {
  searchBox: {
    position: 'relative'
  },
  iconSearch: {
    position: 'absolute',
    right: '5px',
    top: '10px'
  }
}

export default SearchBox
