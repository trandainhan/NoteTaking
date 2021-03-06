import React, { Component } from 'react'
import Head from 'next/head'
import { Editor as DraftEditor, EditorState, RichUtils, ContentState } from 'draft-js'
import classNames from 'classnames'
import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.state = { editorState: this.props.editorState || EditorState.createEmpty() }
    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.toggleBlockStyle = (style) => this._handleToggleBlock(style)
    this.toggleInlineStyle = (style) => this._handtoggleInlineStyle(style)
    this.onChange = (editorState) => {
      this.setState({
        editorState: editorState
      })
      this.props.onChange(editorState)
    }
  }
  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
     if (newState) {
       this.onChange(newState)
       return true
     }
     return false
  }
  _handleToggleBlock (blockType) {
    this.onChange(RichUtils.toggleBlockType(this.state.editorState, blockType));
  }
  _handtoggleInlineStyle (inlineStyle) {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
  }
  componentDidMount () {
    this.refs.editor.focus()
  }
  componentWillReceiveProps (nextProps) {
    // Just assign it instead of setState
    this.state = { editorState: nextProps.editorState || EditorState.createEmpty() }
  }
  render() {
    const { editorState } = this.state
    const claszzName = classNames('Editor-root', this.props.className)
    return (
      <div className={claszzName}>
        <Head>
          <link rel="stylesheet" href="/static/editor.css" />
        </Head>
        <BlockStyleControls
          editorState={editorState}
          onToggle={this.toggleBlockStyle}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={this.toggleInlineStyle}
        />
        <DraftEditor
          ref='editor'
          editorKey="editorKey"
          editorState={
            EditorState.acceptSelection(
              editorState,
              editorState.getSelection()
            )
          }
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.onChange}
        />
      </div>
    );
  }
}
