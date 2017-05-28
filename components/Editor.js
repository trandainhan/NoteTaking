import React, { Component } from 'react'
import Head from 'next/head'
import { Editor as DraftEditor, EditorState, RichUtils, ContentState } from 'draft-js'
import BlockStyleControls from './BlockStyleControls'
import InlineStyleControls from './InlineStyleControls'

export default class Editor extends Component {
  constructor(props) {
    super(props)
    this.editorState = EditorState.createWithContent(ContentState.createFromText(props.editorState))
      || EditorState.createEmpty()
    this.onChange = editorState => this.setState({editorState})
    this.handleKeyCommand = (command) => this._handleKeyCommand(command)
    this.toggleBlockStyle = (style) => this._handleToggleBlock(style)
    this.toggleInlineStyle = (style) => this._handtoggleInlineStyle(style)
  }
  _handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
     if (newState) {
       this.props.onChange(newState)
       return true
     }
     return false
  }
  _handleToggleBlock (blockType) {
    this.props.onChange(RichUtils.toggleBlockType(this.editorState, blockType));
  }
  _handtoggleInlineStyle (inlineStyle) {
    this.props.onChange(RichUtils.toggleInlineStyle(this.editorState, inlineStyle));
  }
  componentDidMount () {
    this.refs.editor.focus()
  }
  render() {
    return (
      <div className="Editor-root">
        <Head>
          <link rel="stylesheet" href="/static/editor.css" />
        </Head>
        <BlockStyleControls
          editorState={this.editorState}
          onToggle={this.toggleBlockStyle}
        />
        <InlineStyleControls
          editorState={this.editorState}
          onToggle={this.toggleInlineStyle}
        />
        <DraftEditor
          ref='editor'
          editorKey="editorKey"
          editorState={this.editorState}
          handleKeyCommand={this.handleKeyCommand}
          onChange={this.props.onChange}
        />
      </div>
    );
  }
}
