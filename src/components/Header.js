import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WordTextInput from './WordTextInput'
import { getGravatar } from '../actions/tool'

export default class Header extends Component {
  static propTypes = {
    addWord: PropTypes.func.isRequired,
    onSaveText: PropTypes.func.isRequired,
    toggleVisibleModel: PropTypes.func.isRequired,
    email: PropTypes.string.isRequired
  }

  handleSave = text => {
    if (text.length !== 0) {
      if( this.props.email !== '' ){
         this.props.addWord( this.props.email, text, this.props.allWords)
      }else{
         this.props.onSaveText(text)
         this.props.toggleVisibleModel(true, 'add')
      }
    }
  }

  render() {
    let gravatar = getGravatar(this.props.email)
    return (
      <header className="header">
        <h1>Guestbook</h1>
        <img src={"https://www.gravatar.com/avatar/" + gravatar} id='people-img' alt="请登录" />
        <WordTextInput newTodo
                       onSave={this.handleSave}
                       placeholder="留下点什么?按Enter留言" />
      </header>
    )
  }
}
