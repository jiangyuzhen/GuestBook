import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'

export default class EmailInput extends Component {
  static propTypes = {
    text: PropTypes.string.isRequired,
    visibleModel: PropTypes.bool.isRequired,
    currentWord: PropTypes.object.isRequired,
    editStuts: PropTypes.string.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = { 
      visible: false,
      email: '',
      error: ''
     }

  showModal = () => {
    this.props.actions.toggleVisibleModel( true, this.props.editStuts )
  }

  handleOk = (e) => {
    const email = this.state.email.trim()
    const { text,  currentWord, actions } = this.props
    const myreg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+.[a-zA-Z]{2,4}$/
    if( myreg.test( email ) ){
      actions.login( email )
      this.setState({ email: '', error: '' })
      if(this.props.editStuts === 'add'){
         actions.addWord( email, text, actions.allWords)
      }else{
         actions.addReply( currentWord, email, text, actions.allWords)
      } 
    }else{
      this.setState({ error: '请填写有效的邮箱地址' })
    } 
  }

  handleCancel = (e) => {
    this.props.actions.toggleVisibleModel( false, this.props.editStuts )
  }

  handleChange = e => {
    this.setState({ email: e.target.value })
  }

  handleKeyDown = e => {
    if (e.which === 13) {
      this.handleOk(e)
    }
  }

  render() {
      return (
       <div>
        <Modal title="填写邮箱地址即可留言" visible={this.props.visibleModel}
          onOk={this.handleOk} onCancel={this.handleCancel}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           >
          <input 
            className="edit"
            type="text"
            placeholder="请输入你的有效的邮箱地址"
            autoFocus="true"
            value={this.state.email}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyDown}/>
          <p className="error">{ this.state.error }</p>
        </Modal>
      </div>
    )
  }
}