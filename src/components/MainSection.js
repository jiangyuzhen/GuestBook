import React, { Component } from 'react'
import PropTypes from 'prop-types'
import WordItem from './WordItem'
// import Footer from './Footer'

export default class MainSection extends Component {
  static propTypes = {
    words: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired,
    email: PropTypes.string.isRequired
  }

  render() {
    const { words, actions, email } = this.props
    return (
      <div style={{'marginTop': 20}}>
        <ul className="todo-list">
           {words.map((word) => 
              <WordItem
                  email={email}
                  word={word} 
                  key={word.id} 
                  {...actions} />
           )}  
        </ul>
      </div>
    )
  }
}
