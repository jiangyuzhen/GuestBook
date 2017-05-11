import React, { Component } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import WordTextInput from './WordTextInput'
import ReplyItem from './ReplyItem'

export default class WordItem extends Component {
  static propTypes = {
    email: PropTypes.string.isRequired,
    word: PropTypes.object.isRequired,
    addReply: PropTypes.func.isRequired,
    onSaveText: PropTypes.func.isRequired,
    toggleVisibleModel: PropTypes.func.isRequired,
  }
  state = {
    visvible: false
   }

  handleReply = () => {
    this.setState({ visvible: true })
  }

  handleSave = (text) => {
    const { email, word, allWords } = this.props
    if (text.length !== 0) {
      if( this.props.email !== '' ){
         this.props.addReply( word.doc, email, text, allWords)
         this.setState({ visvible: false })
      }else{
         this.props.onSaveText(text)
         this.props.toggleVisibleModel(true, 'reply', word.doc)
      }
    }
  }
  
  handleBlur = () => {
    this.setState({ visvible: false })
  }

  toggleReply = () => {
    if( this.state.visvible ){
      return (
        <div style={{'marginTop':10}}>
          <WordTextInput editing
              onSave={this.handleSave}
              onBlur={this.handleBlur}
              placeholder="我也来说一句" />
        </div>
      )
    }
  }

  render() {
    const { word } = this.props  
    return (
       <li key={word.key}>
        <div className="view">
          <div className='left'>
            <img src={"https://www.gravatar.com/avatar/" + word.doc.gravatar} width='60' height='60' alt={word.gravatar} />
          </div>
          <div className='right'>
            <label>{ word.doc.email }</label>
            <div className='text'>{ word.doc.text }</div>
            <span className="time"> { moment(word.doc.time).format('YYYY-MM-DD HH:mm:ss') } </span>
            <span className='reply' onClick={this.handleReply}> 回复 </span>
            <ul>
              { word.doc.replyList.map((reply,index) =>
                 <ReplyItem reply={reply} key={reply._id} />
              )}
            </ul>
            { this.toggleReply() }
          </div>
        </div>
      </li>    
    )
  }
}
